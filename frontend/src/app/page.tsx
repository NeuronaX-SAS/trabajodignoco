import { Box } from '@mui/material';
import HeroSection from '@/components/Landing/HeroSection';
import ContactForm from '@/components/Landing/ContactForm';
import AboutSection from '@/components/Landing/AboutSection';
import NewsSection from '@/components/Landing/NewsSection';
import UnionsMapSection from '@/components/Landing/UnionsMapSection';
import CommunityCallToAction from '@/components/Landing/CommunityCallToAction';

export default function HomePage() {
  return (
    <Box>
      <HeroSection />
      <AboutSection />
      <ContactForm />
      <NewsSection />
      <UnionsMapSection />
      <CommunityCallToAction />
    </Box>
  );
}
