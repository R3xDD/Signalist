import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from '@/components/header'

// Mock child components
jest.mock('@/components/nav-items', () => {
  return function NavItems() {
    return <div data-testid="nav-items">NavItems</div>
  }
})

jest.mock('@/components/user-dropdow-menu', () => {
  return function UserDropDownMenu() {
    return <div data-testid="user-dropdown">UserDropDownMenu</div>
  }
})

describe('Header Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<Header />)
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('should render header element with correct class', () => {
      render(<Header />)
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('sticky', 'top-0', 'header')
    })

    it('should render container div with correct classes', () => {
      const { container } = render(<Header />)
      const containerDiv = container.querySelector('.container.header-wrapper')
      expect(containerDiv).toBeInTheDocument()
    })
  })

  describe('Logo', () => {
    it('should render logo image', () => {
      render(<Header />)
      const logo = screen.getByAltText('Signalist logo')
      expect(logo).toBeInTheDocument()
    })

    it('should have correct logo image source', () => {
      render(<Header />)
      const logo = screen.getByAltText('Signalist logo')
      expect(logo).toHaveAttribute('src', '/assets/icons/logo.svg')
    })

    it('should have correct logo dimensions', () => {
      render(<Header />)
      const logo = screen.getByAltText('Signalist logo')
      expect(logo).toHaveAttribute('height', '32')
      expect(logo).toHaveAttribute('width', '140')
    })

    it('should have correct logo classes', () => {
      render(<Header />)
      const logo = screen.getByAltText('Signalist logo')
      expect(logo).toHaveClass('h-8', 'w-auto', 'cursor-pointer')
    })

    it('should wrap logo in a link to homepage', () => {
      render(<Header />)
      const logo = screen.getByAltText('Signalist logo')
      const link = logo.closest('a')
      expect(link).toHaveAttribute('href', '/')
    })
  })

  describe('Navigation', () => {
    it('should render NavItems component', () => {
      render(<Header />)
      expect(screen.getByTestId('nav-items')).toBeInTheDocument()
    })

    it('should wrap NavItems in a nav element', () => {
      const { container } = render(<Header />)
      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
      expect(nav).toContainElement(screen.getByTestId('nav-items'))
    })

    it('should have responsive visibility classes on nav', () => {
      const { container } = render(<Header />)
      const nav = container.querySelector('nav')
      expect(nav).toHaveClass('hidden', 'sm:block')
    })
  })

  describe('User Dropdown', () => {
    it('should render UserDropDownMenu component', () => {
      render(<Header />)
      expect(screen.getByTestId('user-dropdown')).toBeInTheDocument()
    })

    it('should render UserDropDownMenu outside of nav element', () => {
      const { container } = render(<Header />)
      const userDropdown = screen.getByTestId('user-dropdown')
      const nav = container.querySelector('nav')
      expect(nav).not.toContainElement(userDropdown)
    })
  })

  describe('Layout Structure', () => {
    it('should have sticky positioning', () => {
      render(<Header />)
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('sticky', 'top-0')
    })

    it('should render components in correct order', () => {
      const { container } = render(<Header />)
      const headerWrapper = container.querySelector('.header-wrapper')
      const children = headerWrapper?.children
      
      expect(children).toHaveLength(3)
      // First child should contain the logo link
      expect(children?.[0].tagName.toLowerCase()).toBe('a')
      // Second child should be nav
      expect(children?.[1].tagName.toLowerCase()).toBe('nav')
      // Third child should contain UserDropDownMenu
      expect(children?.[2]).toContainElement(screen.getByTestId('user-dropdown'))
    })
  })

  describe('Responsive Behavior', () => {
    it('should hide navigation on small screens', () => {
      const { container } = render(<Header />)
      const nav = container.querySelector('nav')
      expect(nav).toHaveClass('hidden')
    })

    it('should show navigation on sm+ screens', () => {
      const { container } = render(<Header />)
      const nav = container.querySelector('nav')
      expect(nav).toHaveClass('sm:block')
    })
  })

  describe('Semantic HTML', () => {
    it('should use semantic header element', () => {
      render(<Header />)
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('should use semantic nav element', () => {
      const { container } = render(<Header />)
      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle missing child components gracefully', () => {
      expect(() => render(<Header />)).not.toThrow()
    })

    it('should render with all components present', () => {
      render(<Header />)
      expect(screen.getByAltText('Signalist logo')).toBeInTheDocument()
      expect(screen.getByTestId('nav-items')).toBeInTheDocument()
      expect(screen.getByTestId('user-dropdown')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have accessible logo alt text', () => {
      render(<Header />)
      const logo = screen.getByAltText('Signalist logo')
      expect(logo).toHaveAccessibleName('Signalist logo')
    })

    it('should have proper link structure for logo', () => {
      render(<Header />)
      const logo = screen.getByAltText('Signalist logo')
      const link = logo.closest('a')
      expect(link).toHaveAttribute('href')
    })
  })
})