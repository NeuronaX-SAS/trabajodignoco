import { Box } from '@mui/material';
import HeroSection from '@/components/Landing/HeroSection';
import AboutSection from '@/components/Landing/AboutSection';
import ResourcesSection from '@/components/Landing/ResourcesSection';
import FormationSection from '@/components/Landing/FormationSection';
import NewsSection from '@/components/Landing/NewsSection';
import ContactForm from '@/components/Landing/ContactForm';
import CommunityCallToAction from '@/components/Landing/CommunityCallToAction';

export default function HomePage() {
  return (
    <Box>
      <HeroSection />
      <AboutSection />
      <ResourcesSection />
      <FormationSection />
      <NewsSection />
      <ContactForm />
      <CommunityCallToAction />
    </Box>
  );
}
