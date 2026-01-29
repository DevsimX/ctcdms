'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import HomeOutlined from '@mui/icons-material/HomeOutlined'
import BusinessOutlined from '@mui/icons-material/BusinessOutlined'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import AdminPanelSettingsOutlined from '@mui/icons-material/AdminPanelSettingsOutlined'
import CodeOutlined from '@mui/icons-material/CodeOutlined'
import Logout from '@mui/icons-material/Logout'
import { useAuth } from '@/contexts/AuthContext'

const DRAWER_WIDTH = 240

const menuItems = [
  { path: '/welcome', label: 'Dashboard', icon: <HomeOutlined /> },
  { path: '/institution', label: 'Institution', icon: <BusinessOutlined /> },
  { path: '/search', label: 'Search', icon: <SearchOutlined /> },
  { path: '/admin', label: 'Admin', icon: <AdminPanelSettingsOutlined /> },
  { path: '/devcomponents', label: 'Dev Components', icon: <CodeOutlined /> },
]

export default function BasicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component={Link} href="/" sx={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}>
            CTCDMS
          </Typography>
          {user ? (
            <>
              <Typography variant="body2" sx={{ mr: 2 }}>{user.username}</Typography>
              <IconButton color="inherit" onClick={logout} title="Logout">
                <Logout />
              </IconButton>
            </>
          ) : (
            <Button color="inherit" component={Link} href="/user/login">
              Log in
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, pt: 8 },
        }}
      >
        <NavList pathname={pathname} onSelect={() => setMobileOpen(false)} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, pt: 8 },
        }}
        open
      >
        <NavList pathname={pathname} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10 }}>
        {children}
      </Box>
    </Box>
  )
}

function NavList({ pathname, onSelect }: { pathname: string; onSelect?: () => void }) {
  return (
    <List>
      {menuItems.map(({ path, label, icon }) => (
        <ListItemButton
          key={path}
          component={Link}
          href={path}
          selected={pathname === path || pathname.startsWith(path + '/')}
          onClick={onSelect}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      ))}
    </List>
  )
}
