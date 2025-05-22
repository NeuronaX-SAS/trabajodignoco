// Types
export interface Resource {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  question?: string;
  content?: string;
  whatToDo?: string;
  whereTo?: string;
  alternatives?: string;
  considerations?: string;
  regulations?: string;
  costs?: string;
  requiresLawyer?: string;
  isOnline?: string;
  tags?: string[];
}

export interface ResourcesData {
  resources: Resource[];
}

// API functions
export const getResources = async (): Promise<Resource[]> => {
  try {
    const response = await fetch('/educontent/resources.json');
    if (!response.ok) {
      throw new Error('Failed to fetch resources');
    }
    const data: ResourcesData = await response.json();
    
    // Add tags based on category and subcategory
    return data.resources.map(resource => ({
      ...resource,
      tags: [
        resource.category,
        ...(resource.subcategory ? [resource.subcategory] : []),
      ],
    }));
  } catch (error) {
    console.error('Error fetching resources:', error);
    return [];
  }
};

// Helper function to ensure all categories have content
export const ensureResourcesForAllCategories = async (): Promise<{ [key: string]: Resource[] }> => {
  try {
    const resources = await getResources();
    const mainCategories = [
      'Derechos',
      'Laboral',
      'Seguridad Social',
      'Terminación de contrato laboral',
      'Pensión',
      'Trámites laborales'
    ];
    
    // Initialize result object
    const result: { [key: string]: Resource[] } = {};
    mainCategories.forEach(cat => { result[cat] = []; });
    
    // First pass: exact matches
    resources.forEach(resource => {
      const exactMatch = mainCategories.find(cat => resource.category === cat);
      if (exactMatch) {
        result[exactMatch].push(resource);
      }
    });
    
    // Second pass: partial matches for categories that don't have resources yet
    mainCategories.forEach(category => {
      if (result[category].length === 0) {
        const categoryLower = category.toLowerCase();
        
        resources.forEach(resource => {
          // Skip if already assigned to another category
          if (mainCategories.some(cat => result[cat].includes(resource))) {
            return;
          }
          
          // Try partial match
          if (resource.category.toLowerCase().includes(categoryLower) || 
              categoryLower.includes(resource.category.toLowerCase()) ||
              (resource.subcategory && resource.subcategory.toLowerCase().includes(categoryLower))) {
            result[category].push(resource);
          }
        });
      }
    });
    
    // Third pass: intelligent distribution of remaining resources
    resources.forEach(resource => {
      // Skip if already assigned
      if (mainCategories.some(cat => result[cat].includes(resource))) {
        return;
      }
      
      // Assign based on content keywords
      if (resource.content?.toLowerCase().includes('derecho')) {
        result['Derechos'].push(resource);
      } else if (resource.content?.toLowerCase().includes('contrato') || 
                 resource.content?.toLowerCase().includes('trabajo')) {
        result['Laboral'].push(resource);
      } else if (resource.content?.toLowerCase().includes('salud') ||
                 resource.content?.toLowerCase().includes('seguridad')) {
        result['Seguridad Social'].push(resource);
      } else if (resource.content?.toLowerCase().includes('despido') ||
                 resource.content?.toLowerCase().includes('terminación')) {
        result['Terminación de contrato laboral'].push(resource);
      } else if (resource.content?.toLowerCase().includes('pensión') ||
                 resource.content?.toLowerCase().includes('jubilación')) {
        result['Pensión'].push(resource);
      } else if (resource.content?.toLowerCase().includes('trámite') ||
                 resource.content?.toLowerCase().includes('procedimiento')) {
        result['Trámites laborales'].push(resource);
      } else {
        // Default to Laboral if no specific match
        result['Laboral'].push(resource);
      }
    });
    
    return result;
  } catch (error) {
    console.error('Error ensuring resources for all categories:', error);
    return {};
  }
};

export const getResourceById = async (id: string): Promise<Resource | null> => {
  try {
    const resources = await getResources();
    const resource = resources.find(r => r.id === id);
    return resource || null;
  } catch (error) {
    console.error('Error fetching resource by ID:', error);
    return null;
  }
};

export const getResourcesByCategory = async (category: string): Promise<Resource[]> => {
  try {
    const resources = await getResources();
    
    // Make the comparison more flexible to handle encoding or partial matches
    const categoryLower = category.toLowerCase();
    
    return resources.filter(r => {
      // Check for exact match first
      if (r.category === category) return true;
      
      // Then check for partial/case-insensitive match
      if (r.category.toLowerCase().includes(categoryLower) || 
          categoryLower.includes(r.category.toLowerCase())) {
        return true;
      }
      
      // For "Trámites laborales" special case
      if (category === "Trámites laborales" && 
          (r.category.includes("mites") || r.subcategory?.includes("mite"))) {
        return true;
      }
      
      // For "Derechos" special case
      if (category === "Derechos" && r.category.includes("Derecho")) {
        return true;
      }
      
      return false;
    });
  } catch (error) {
    console.error('Error fetching resources by category:', error);
    return [];
  }
};

export const getResourcesByTags = async (tags: string[]): Promise<Resource[]> => {
  try {
    const resources = await getResources();
    return resources.filter(r => 
      r.tags && r.tags.some(tag => tags.includes(tag))
    );
  } catch (error) {
    console.error('Error fetching resources by tags:', error);
    return [];
  }
};

export const searchResources = async (query: string): Promise<Resource[]> => {
  try {
    const resources = await getResources();
    if (!query) return resources;
    
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    return resources.filter(resource => {
      const searchableText = [
        resource.title,
        resource.category,
        resource.subcategory,
        resource.question,
        resource.content,
        resource.whatToDo,
        resource.whereTo,
        resource.alternatives,
        resource.considerations,
        resource.regulations,
      ].filter(Boolean).join(' ').toLowerCase();
      
      return searchTerms.some(term => searchableText.includes(term));
    });
  } catch (error) {
    console.error('Error searching resources:', error);
    return [];
  }
};

export const getRelatedResources = async (currentResourceId: string, count: number = 3): Promise<Resource[]> => {
  try {
    const allResources = await getResources();
    const currentResource = allResources.find(r => r.id === currentResourceId);
    
    if (!currentResource) return [];
    
    // Filter out the current resource
    const otherResources = allResources.filter(r => r.id !== currentResourceId);
    
    // Score each resource based on relevance to current resource
    const scoredResources = otherResources.map(resource => {
      let score = 0;
      
      // Same category = high relevance
      if (resource.category === currentResource.category) {
        score += 5;
      }
      
      // Same subcategory = high relevance
      if (resource.subcategory && resource.subcategory === currentResource.subcategory) {
        score += 3;
      }
      
      // Check for content similarity
      const currentContent = [
        currentResource.title,
        currentResource.question,
        currentResource.content
      ].filter(Boolean).join(' ').toLowerCase();
      
      const resourceContent = [
        resource.title,
        resource.question,
        resource.content
      ].filter(Boolean).join(' ').toLowerCase();
      
      // Check for common keywords
      const keywords = [
        'derecho', 'trabajo', 'laboral', 'contrato', 'despido', 'salud',
        'pensión', 'indemnización', 'liquidación', 'prestaciones'
      ];
      
      keywords.forEach(keyword => {
        if (currentContent.includes(keyword) && resourceContent.includes(keyword)) {
          score += 1;
        }
      });
      
      return { resource, score };
    });
    
    // Sort by score and take the top 'count'
    return scoredResources
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map(item => item.resource);
    
  } catch (error) {
    console.error('Error fetching related resources:', error);
    return [];
  }
}; 