'use client';

import React, { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Container, 
  Button, 
  useScrollTrigger,
  Slide,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  ListItemButton
} from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface MainLayoutProps {
  children: React.ReactNode;
}

// Hide AppBar on scroll down, show on scroll up
function HideOnScroll(props: { children: React.ReactElement }) { // Ensure children is ReactElement
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Function to handle contact form redirection
  const scrollToContact = () => {
    // Close drawer if open
    if (drawerOpen) {
      setDrawerOpen(false);
    }
    
    // If not on homepage, navigate to homepage first
    if (pathname !== '/') {
      router.push('/#contact-form');
      return;
    }
    
    // Scroll to contact form
    const contactFormElement = document.getElementById('contact-form');
    if (contactFormElement) {
      contactFormElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Navigation links
  const navLinks = [
    { title: 'Inicio', path: '/' },
    { title: 'Quiénes Somos', path: '/#about' },
    { title: 'Recursos', path: '/#resources' },
    { title: 'Formación', path: '/#education' },
    { title: 'Noticias', path: '/#news' },
    { title: 'Contacto', onClick: scrollToContact },
  ];

  // Button style based on active state
  const getNavButtonStyle = (path: string) => {
    const isActive = pathname === path;
    return {
      mx: 1,
      color: 'white',
      position: 'relative',
      '&:after': isActive ? {
        content: '""',
        position: 'absolute',
        width: '70%',
        height: '3px',
        bottom: -4,
        left: '15%',
        backgroundColor: 'white',
        borderRadius: '3px'
      } : {}
    };
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HideOnScroll>
        <AppBar position="sticky" elevation={0} sx={{ 
          background: 'linear-gradient(135deg, #733A19 0%, #5C2E14 100%)',
          py: { xs: 0.5, sm: 1 }  // Reduced padding on extra small screens
        }}>
          <Toolbar sx={{ 
            justifyContent: 'space-between', 
            minHeight: { xs: '56px', sm: '64px' },  // Explicit min-height for mobile
            px: { xs: 1, sm: 2 },  // Less horizontal padding on mobile
            position: 'relative'   // Add relative positioning
          }}>
            {/* Logo and Brand - Centered on mobile */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              width: isMobile ? '100%' : 'auto',
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 1 : 2 }}>
                <Image
                  src="/logos/logo.svg"
                  alt="Trabajo Digno Logo"
                  width={isMobile ? 32 : 40}  // Smaller logo on mobile
                  height={isMobile ? 32 : 40}
                  style={{ 
                    borderRadius: '50%', 
                    background: '#BFAF8F', 
                    padding: isMobile ? 2 : 3,
                    objectFit: 'contain',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  priority
                />
                <Typography 
                  variant={isMobile ? "subtitle1" : "h6"}  // Smaller text on mobile
                  component={Link} 
                  href="/"
                  sx={{ 
                    fontWeight: 700, 
                    letterSpacing: '0.5px',
                    textDecoration: 'none',
                    color: '#F2F0F0',
                    display: 'flex',
                    alignItems: 'center',
                    ml: isMobile ? 0 : 2,
                    fontSize: { xs: '1rem', sm: '1.25rem' } // Explicit font size control
                  }}
                >
                  Trabajo<Box component="span" sx={{ color: '#BFAF8F' }}>Digno</Box>
                </Typography>
              </Box>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {navLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    {link.path ? (
                      <Button 
                        component={Link} 
                        href={link.path}
                        sx={getNavButtonStyle(link.path)}
                      >
                        {link.title}
                      </Button>
                    ) : (
                      <Button 
                        onClick={link.onClick}
                        sx={getNavButtonStyle('')}
                      >
                        {link.title}
                      </Button>
                    )}
                  </React.Fragment>
                ))}
              </Box>
            )}

            {/* Replace Auth Buttons with single button */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button 
                  variant="contained"
                  sx={{ 
                    backgroundColor: '#BFAF8F', 
                    color: '#0E1013',
                    fontWeight: 600,
                    '&:hover': { backgroundColor: '#D0C7AF' },
                    minWidth: 'fit-content',
                    whiteSpace: 'nowrap',
                    mr: { xs: 3.5, sm: 1 }
                  }}
                  onClick={() => router.push('/portal')}
                >
                  Ingresa a Trabajo Digno
                </Button>
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton 
                edge="end" 
                color="inherit" 
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ 
                  position: 'absolute',
                  right: 8,
                  p: 1,  // Reduced padding for the button itself
                  zIndex: 2  // Ensure it's above other elements
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': { 
            width: '70%', 
            maxWidth: 300,
            backgroundImage: 'linear-gradient(180deg, #153959 0%, #0D253C 100%)',
            color: 'white',
            px: 2
          }
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          py: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Image 
              src="/fleur-de-lis.svg" 
              alt="TrabajoDigno.co Logo" 
              width={24} 
              height={24}
              priority
            />
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>
              Menu
            </Typography>
          </Box>
          <IconButton color="inherit" onClick={toggleDrawer} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>
        
        <List>
          {/* Navigation Links */}
          {navLinks.map((link, index) => (
            <ListItem key={index} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={link.onClick || (() => {
                  router.push(link.path || '/');
                  setDrawerOpen(false);
                })}
                sx={{
                  borderRadius: 1,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                }}
              >
                <ListItemText
                  primary={link.title}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          {/* Auth Links - Replace with single "Ingresa a Trabajo Digno" button */}
          <Box sx={{ mt: 2, borderTop: '1px solid rgba(255,255,255,0.1)', pt: 2 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                router.push('/portal');
                setDrawerOpen(false);
              }}
              sx={{ 
                mt: 1, 
                backgroundColor: '#BFAF8F', 
                color: '#0E1013',
                fontWeight: 600,
                '&:hover': { backgroundColor: '#D0C7AF' } 
              }}
            >
              Ingresa a Trabajo Digno
            </Button>
          </Box>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, width: '100%', p: 0, m: 0 }}>{children}</Box>

    </Box>
  );
};

export default MainLayout;