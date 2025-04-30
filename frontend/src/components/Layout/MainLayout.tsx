'use client';

import React, { useState, useEffect } from 'react';
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
  Avatar,
  ListItemButton
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { logout } from '../../lib/redux/slices/authSlice';
import { RootState, AppDispatch } from '../../lib/redux/store';

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
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

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
    { title: 'Servicios', onClick: scrollToContact },
    { title: 'Precios', onClick: scrollToContact },
    { title: 'Contáctanos', onClick: scrollToContact },
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
          background: 'linear-gradient(135deg, #DE735B 0%, #C35D45 100%)',
          py: 1
        }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* Logo and Brand */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 40, height: 40, mr: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image 
                  src="/fleur-de-lis.svg" 
                  alt="TrabajoDigno.co Logo" 
                  width={30} 
                  height={30}
                  priority
                />
              </Box>
              <Typography 
                variant="h6" 
                component={Link} 
                href="/"
                sx={{ 
                  fontWeight: 700, 
                  letterSpacing: '0.5px',
                  textDecoration: 'none',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center' 
                }}
              >
                TrabajoDigno<Box component="span" sx={{ color: 'rgba(255,255,255,0.9)' }}>.co</Box>
              </Typography>
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

            {/* Auth Buttons or User Menu */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {isAuthenticated ? (
                  <>
                    <Button 
                      variant="outlined"
                      color="inherit"
                      component={Link} 
                      href="/dashboard"
                      sx={{ 
                        mr: 1.5, 
                        borderColor: 'rgba(255,255,255,0.5)',
                        '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
                      }}
                    >
                      Dashboard
                    </Button>
                    <Button 
                      color="inherit" 
                      onClick={handleLogout}
                      sx={{ backgroundColor: 'rgba(0,0,0,0.1)', '&:hover': { backgroundColor: 'rgba(0,0,0,0.2)' } }}
                    >
                      Cerrar Sesión
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outlined"
                      color="inherit"
                      onClick={scrollToContact}
                      sx={{ 
                        mr: 1.5, 
                        borderColor: 'rgba(255,255,255,0.5)',
                        '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
                      }}
                    >
                      Iniciar Sesión
                    </Button>
                    <Button 
                      variant="contained"
                      color="secondary"
                      onClick={scrollToContact}
                      sx={{ 
                        backgroundColor: 'white', 
                        color: '#DE735B',
                        fontWeight: 600,
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' } 
                      }}
                    >
                      Registrarse
                    </Button>
                  </>
                )}
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton 
                edge="end" 
                color="inherit" 
                aria-label="menu"
                onClick={toggleDrawer}
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
            backgroundImage: 'linear-gradient(180deg, #DE735B 0%, #C35D45 100%)',
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
          
          {/* Auth Links */}
          <Box sx={{ mt: 2, borderTop: '1px solid rgba(255,255,255,0.1)', pt: 2 }}>
            {isAuthenticated ? (
              <>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    component={Link}
                    href="/dashboard"
                    onClick={() => setDrawerOpen(false)}
                    sx={{ borderRadius: 1, '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                  >
                    <ListItemText primary="Dashboard" primaryTypographyProps={{ fontWeight: 500 }} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      handleLogout();
                      setDrawerOpen(false);
                    }}
                    sx={{ borderRadius: 1, '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                  >
                    <ListItemText primary="Cerrar Sesión" primaryTypographyProps={{ fontWeight: 500 }} />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    onClick={() => {
                      scrollToContact();
                      setDrawerOpen(false);
                    }}
                    sx={{ borderRadius: 1, '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                  >
                    <ListItemText primary="Iniciar Sesión" primaryTypographyProps={{ fontWeight: 500 }} />
                  </ListItemButton>
                </ListItem>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => {
                    scrollToContact();
                    setDrawerOpen(false);
                  }}
                  sx={{ 
                    mt: 1, 
                    backgroundColor: 'white', 
                    color: '#DE735B',
                    fontWeight: 600,
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' } 
                  }}
                >
                  Registrarse
                </Button>
              </>
            )}
          </Box>
        </List>
      </Drawer>

      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {children}
      </Container>

    </Box>
  );
};

export default MainLayout;