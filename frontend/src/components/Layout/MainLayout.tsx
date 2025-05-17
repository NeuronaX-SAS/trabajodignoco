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
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { title: 'Quiénes Somos', path: '/#about-section' },
    { title: 'Recursos', path: '/#resources' },
    { title: 'Formación', path: '/#education' },
    { title: 'Noticias', path: '/#news' },
    { title: 'Contacto', onClick: scrollToContact },
  ];

  // Button style based on active state
  const getNavButtonStyle = (path: string) => {
    const isActive = pathname === path || 
                    (path !== '/' && pathname?.startsWith(path));
    return {
      mx: 1,
      color: 'white',
      opacity: isActive ? 1 : 0.85,
      fontWeight: isActive ? 600 : 500,
      position: 'relative',
      transition: 'all 0.3s ease',
      '&:hover': {
        opacity: 1,
        backgroundColor: 'rgba(255,255,255,0.1)'
      },
      '&:after': isActive ? {
        content: '""',
        position: 'absolute',
        width: '40%',
        height: '3px',
        bottom: 8,
        left: '30%',
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '3px'
      } : {}
    };
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HideOnScroll>
        <AppBar 
          position="fixed" 
          elevation={isScrolled ? 4 : 0} 
          sx={{ 
            background: isScrolled 
              ? 'linear-gradient(135deg, rgba(115, 58, 25, 0.95) 0%, rgba(92, 46, 20, 0.95) 100%)'
              : 'transparent',
            backdropFilter: isScrolled ? 'blur(10px)' : 'none',
            transition: 'all 0.3s ease-in-out',
            borderBottom: isScrolled ? 'none' : '1px solid rgba(255,255,255,0.1)',
            py: isScrolled ? 0.5 : 1
          }}
        >
          <Toolbar 
            sx={{ 
              justifyContent: 'space-between',
              px: { xs: 2, sm: 4, md: 6 },
              minHeight: { xs: 56, sm: 64 },
              flexWrap: 'wrap',
              overflow: 'hidden',
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}
          >
            {/* Logo and Brand - Centered on mobile */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              width: isMobile ? '100%' : 'auto',
              justifyContent: isMobile ? 'center' : 'flex-start',
              overflow: 'hidden',
              flexShrink: 1,
              pr: 2
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, overflow: 'hidden' }}>
                <Box 
                  component={Link}
                  href="/"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    gap: 2,
                    overflow: 'hidden',
                    flexShrink: 1
                  }}
                >
                  <Box 
                    sx={{ 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #BFAF8F 0%, #A69977 100%)',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isScrolled ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
                      transition: 'all 0.3s ease',
                      flexShrink: 0,
                      width: isScrolled ? 36 : 40,
                      height: isScrolled ? 36 : 40
                    }}
                  >
                    <Image
                      src="/ICONO (5).png"
                      alt="Trabajo Digno Logo"
                      width={isScrolled ? 36 : 40}
                      height={isScrolled ? 36 : 40}
                      style={{ objectFit: 'cover' }}
                      priority
                    />
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700, 
                      letterSpacing: '0.5px',
                      color: '#F2F0F0',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: isScrolled ? '1.1rem' : '1.25rem',
                      transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      flexShrink: 1
                    }}
                  >
                    Trabajo<Box component="span" sx={{ color: '#BFAF8F' }}>Digno</Box>
                  </Typography>
                </Box>
                {/* Social Media Icons - Only show on desktop */}
                {!isMobile && (
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      ml: 3, 
                      gap: 1.5,
                      opacity: isScrolled ? 0.9 : 0.8,
                      transition: 'all 0.3s ease',
                      flexShrink: 0
                    }}
                  >
                    {[
                      { 
                        icon: '/logos/instagram.svg', 
                        alt: 'Instagram', 
                        href: 'https://www.instagram.com/trabajodigno.col/'
                      },
                      { 
                        icon: '/logos/tiktok.svg', 
                        alt: 'TikTok', 
                        href: 'https://www.tiktok.com/@trabajodigno.col'
                      },
                      { 
                        icon: '/logos/facebook.svg', 
                        alt: 'Facebook', 
                        href: 'https://www.facebook.com/profile.php?id=61575746772724'
                      }
                    ].map((social, index) => (
                      <Box 
                        component="a"
                        key={index}
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        sx={{
                          opacity: 0.9,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            opacity: 1,
                            transform: 'translateY(-2px)'
                          },
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <img 
                          src={social.icon} 
                          alt={social.alt} 
                          width={22} 
                          height={22} 
                          style={{ width: 22, height: 22 }} 
                        />
                      </Box>
                    ))}
                  </Box>
                )}
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
                        borderColor: 'rgba(242,240,240,0.5)',
                        '&:hover': { 
                          borderColor: '#F2F0F0', 
                          backgroundColor: 'rgba(242,240,240,0.1)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Mi Espacio
                    </Button>
                    <Button 
                      color="inherit" 
                      onClick={handleLogout}
                      sx={{ 
                        backgroundColor: 'rgba(14,16,19,0.2)', 
                        '&:hover': { 
                          backgroundColor: 'rgba(14,16,19,0.3)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
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
                        borderColor: 'rgba(242,240,240,0.5)',
                        borderWidth: 1.5,
                        '&:hover': { 
                          borderColor: '#F2F0F0', 
                          backgroundColor: 'rgba(242,240,240,0.1)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Participa
                    </Button>
                    <Button 
                      variant="contained"
                      sx={{ 
                        background: 'linear-gradient(135deg, #BFAF8F 0%, #A69977 100%)', 
                        color: '#0E1013',
                        fontWeight: 600,
                        boxShadow: '0 4px 10px rgba(191,175,143,0.3)',
                        '&:hover': { 
                          background: 'linear-gradient(135deg, #CABC9E 0%, #B5A886 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 12px rgba(191,175,143,0.4)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                      onClick={scrollToContact}
                    >
                      Únete
                    </Button>
                  </>
                )}
              </Box>
            )}

            {/* Mobile hamburger menu */}
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ 
                  position: 'absolute',
                  right: 16,
                  color: '#F2F0F0',
                  backgroundColor: drawerOpen ? 'rgba(242,240,240,0.1)' : 'transparent',
                  '&:hover': { backgroundColor: 'rgba(242,240,240,0.15)' }
                }}
              >
                {drawerOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: '80%',
            maxWidth: '300px',
            backgroundColor: '#733A19',
            backgroundImage: 'linear-gradient(135deg, #733A19 0%, #5C2E14 100%)',
            color: '#F2F0F0',
            paddingTop: '1rem'
          }
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ padding: '1rem 1.5rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Image
                src="/ICONO (5).png"
                alt="Trabajo Digno Logo"
                width={40}
                height={40}
                style={{ borderRadius: '50%', background: '#BFAF8F', padding: 4 }}
              />
              <Typography 
                variant="h6" 
                sx={{ 
                  ml: 2,
                  fontWeight: 700, 
                  color: '#F2F0F0',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                Trabajo<Box component="span" sx={{ color: '#BFAF8F' }}>Digno</Box>
              </Typography>
            </Box>
            
            <List component="nav" sx={{ mb: 4 }}>
              {navLinks.map((link, index) => (
                <ListItem 
                  key={index} 
                  disablePadding
                  sx={{ mb: 1 }}
                >
                  {link.path ? (
                    <ListItemButton
                      component={Link}
                      href={link.path}
                      onClick={toggleDrawer}
                      sx={{
                        borderRadius: '8px',
                        backgroundColor: pathname === link.path ? 'rgba(242,240,240,0.1)' : 'transparent',
                        '&:hover': { backgroundColor: 'rgba(242,240,240,0.15)' }
                      }}
                    >
                      <ListItemText 
                        primary={link.title} 
                        primaryTypographyProps={{
                          fontWeight: pathname === link.path ? 600 : 400
                        }}
                      />
                    </ListItemButton>
                  ) : (
                    <ListItemButton
                      onClick={() => {
                        toggleDrawer();
                        if (link.onClick) link.onClick();
                      }}
                      sx={{
                        borderRadius: '8px',
                        '&:hover': { backgroundColor: 'rgba(242,240,240,0.15)' }
                      }}
                    >
                      <ListItemText primary={link.title} />
                    </ListItemButton>
                  )}
                </ListItem>
              ))}
            </List>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {isAuthenticated ? (
                <>
                  <Button 
                    variant="outlined"
                    color="inherit"
                    fullWidth
                    component={Link} 
                    href="/dashboard"
                    onClick={toggleDrawer}
                    sx={{ 
                      borderColor: 'rgba(242,240,240,0.5)',
                      '&:hover': { borderColor: '#F2F0F0', backgroundColor: 'rgba(242,240,240,0.1)' }
                    }}
                  >
                    Mi Espacio
                  </Button>
                  <Button 
                    color="inherit" 
                    fullWidth
                    onClick={() => {
                      toggleDrawer();
                      handleLogout();
                    }}
                    sx={{ 
                      backgroundColor: 'rgba(14,16,19,0.2)', 
                      '&:hover': { backgroundColor: 'rgba(14,16,19,0.3)' } 
                    }}
                  >
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outlined"
                    color="inherit"
                    fullWidth
                    onClick={() => {
                      toggleDrawer();
                      scrollToContact();
                    }}
                    sx={{ 
                      borderColor: 'rgba(242,240,240,0.5)',
                      '&:hover': { borderColor: '#F2F0F0', backgroundColor: 'rgba(242,240,240,0.1)' }
                    }}
                  >
                    Participa
                  </Button>
                  <Button 
                    variant="contained"
                    fullWidth
                    sx={{ 
                      backgroundColor: '#BFAF8F', 
                      color: '#0E1013',
                      fontWeight: 600,
                      '&:hover': { backgroundColor: '#D0C7AF' } 
                    }}
                    onClick={() => {
                      toggleDrawer();
                      scrollToContact();
                    }}
                  >
                    Únete
                  </Button>
                </>
              )}
            </Box>
          </Box>
          
          {/* Social Media */}
          <Box sx={{ 
            mt: 'auto', 
            pt: 4, 
            pb: 4, 
            display: 'flex', 
            justifyContent: 'center',
            gap: 3,
            borderTop: '1px solid rgba(242,240,240,0.1)',
            backgroundColor: 'rgba(0,0,0,0.05)'
          }}>
            <a href="https://www.instagram.com/trabajodigno.col/" target="_blank" rel="noopener noreferrer">
              <img src="/logos/instagram.svg" alt="Instagram" width={26} height={26} />
            </a>
            <a href="https://www.tiktok.com/@trabajodigno.col" target="_blank" rel="noopener noreferrer">
              <img src="/logos/tiktok.svg" alt="TikTok" width={26} height={26} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61575746772724" target="_blank" rel="noopener noreferrer">
              <img src="/logos/facebook.svg" alt="Facebook" width={26} height={26} />
            </a>
          </Box>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ 
        flexGrow: 1,
        // Add top padding to account for the fixed navbar
        pt: { xs: 7, sm: 8 }
      }}>
        {/* Content */}
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;