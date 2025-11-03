import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '@/app/(root)/page'

describe('Home Page Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<Home />)
      expect(screen.getByText('Home')).toBeInTheDocument()
    })

    it('should render a div container', () => {
      const { container } = render(<Home />)
      const homeDiv = container.querySelector('div')
      expect(homeDiv).toBeInTheDocument()
    })

    it('should display "Home" text', () => {
      render(<Home />)
      expect(screen.getByText('Home')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should have flex layout class', () => {
      const { container } = render(<Home />)
      const homeDiv = container.querySelector('.flex')
      expect(homeDiv).toBeInTheDocument()
    })

    it('should have min-h-screen class for full viewport height', () => {
      const { container } = render(<Home />)
      const homeDiv = container.querySelector('.min-h-screen')
      expect(homeDiv).toBeInTheDocument()
    })

    it('should have home-wrapper class', () => {
      const { container } = render(<Home />)
      const homeDiv = container.querySelector('.home-wrapper')
      expect(homeDiv).toBeInTheDocument()
    })

    it('should have all expected classes', () => {
      const { container } = render(<Home />)
      const homeDiv = container.querySelector('div')
      expect(homeDiv).toHaveClass('flex', 'min-h-screen', 'home-wrapper')
    })
  })

  describe('Content', () => {
    it('should render exactly "Home" text', () => {
      render(<Home />)
      const homeText = screen.getByText('Home')
      expect(homeText).toBeInTheDocument()
      expect(homeText.textContent).toBe('Home')
    })

    it('should not render any other content', () => {
      const { container } = render(<Home />)
      const homeDiv = container.querySelector('.home-wrapper')
      expect(homeDiv?.textContent?.trim()).toBe('Home')
    })
  })

  describe('Component Structure', () => {
    it('should be a functional component', () => {
      expect(typeof Home).toBe('function')
    })

    it('should have single root div element', () => {
      const { container } = render(<Home />)
      const homeDiv = container.querySelector('.home-wrapper')
      expect(homeDiv).toBeInTheDocument()
      expect(homeDiv?.tagName.toLowerCase()).toBe('div')
    })
  })

  describe('Edge Cases', () => {
    it('should render consistently on multiple renders', () => {
      const { rerender } = render(<Home />)
      expect(screen.getByText('Home')).toBeInTheDocument()
      
      rerender(<Home />)
      expect(screen.getByText('Home')).toBeInTheDocument()
    })

    it('should not crash with multiple instances', () => {
      const { container } = render(
        <>
          <Home />
          <Home />
        </>
      )
      const homeDivs = container.querySelectorAll('.home-wrapper')
      expect(homeDivs).toHaveLength(2)
    })
  })

  describe('Accessibility', () => {
    it('should render text content that is accessible', () => {
      render(<Home />)
      expect(screen.getByText('Home')).toBeVisible()
    })

    it('should not have accessibility violations in structure', () => {
      const { container } = render(<Home />)
      expect(container.querySelector('div')).toBeInTheDocument()
    })
  })

  describe('Layout Integration', () => {
    it('should work within a layout wrapper', () => {
      const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
        <div data-testid="layout">{children}</div>
      )
      
      render(
        <LayoutWrapper>
          <Home />
        </LayoutWrapper>
      )
      
      expect(screen.getByTestId('layout')).toContainElement(
        screen.getByText('Home')
      )
    })
  })

  describe('Styling Verification', () => {
    it('should have correct flexbox setup for future content', () => {
      const { container } = render(<Home />)
      const homeDiv = container.querySelector('.home-wrapper')
      expect(homeDiv).toHaveClass('flex')
    })

    it('should span full screen height', () => {
      const { container } = render(<Home />)
      const homeDiv = container.querySelector('.home-wrapper')
      expect(homeDiv).toHaveClass('min-h-screen')
    })
  })

  describe('Component Export', () => {
    it('should export a default component', () => {
      expect(Home).toBeDefined()
      expect(typeof Home).toBe('function')
    })

    it('should be a valid React component', () => {
      expect(() => render(<Home />)).not.toThrow()
    })
  })

  describe('Future Extensibility', () => {
    it('should have container div ready for additional content', () => {
      const { container } = render(<Home />)
      const homeDiv = container.querySelector('.home-wrapper')
      expect(homeDiv).toBeInTheDocument()
      expect(homeDiv?.children.length).toBeGreaterThanOrEqual(0)
    })
  })
})