import React from 'react';
import Link from 'next/link';
import { Container, Typography, Box } from '@mui/material'; // Assuming Material UI is used based on ThemeRegistry
import HeroSection from '@/components/Landing/HeroSection'; // Import the HeroSection component
import ValueProposition from '@/components/Landing/ValueProposition'; // Import the ValueProposition component
import MembershipPlans from '@/components/Landing/MembershipPlans'; // Import the MembershipPlans component
import UseCases from '@/components/Landing/UseCases'; // Import the UseCases component
import HowItWorks from '@/components/Landing/HowItWorks'; // Import the HowItWorks component
import ContactForm from '@/components/Landing/ContactForm'; // Import the ContactForm component
import Footer from '@/components/Landing/Footer'; // Import the Footer component

export default function LandingPage() {
  return (
    <Box component="main">
      {/* Section 1: Hero */}
      <HeroSection />

      {/* Section 2: Value Proposition */}
      <ValueProposition />

      {/* Section 3: Membership Plans */}
      <MembershipPlans />

      {/* Section 4: Use Cases / Problem-Solution */}
      <UseCases />

      {/* Section 5: How It Works */}
      <HowItWorks />

      {/* Section 6: Contact Form */}
      <ContactForm />

      {/* Footer Section */}
      <Footer />
    </Box>
  );
}
