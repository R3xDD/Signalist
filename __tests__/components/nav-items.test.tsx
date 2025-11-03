import React from 'react'
import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import NavItems from '@/components/nav-items'
import { NAV_ITEMS } from '@/lib/constants'

// Mock the usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('NavItems Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      expect(screen.getByRole('list')).toBeInTheDocument()
    })

    it('should render all navigation items from NAV_ITEMS constant', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      NAV_ITEMS.forEach((item) => {
        expect(screen.getByText(item.title)).toBeInTheDocument()
      })
    })

    it('should render correct number of list items', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      const listItems = screen.getAllByRole('listitem')
      expect(listItems).toHaveLength(NAV_ITEMS.length)
    })

    it('should render links with correct href attributes', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      NAV_ITEMS.forEach((item) => {
        const link = screen.getByText(item.title).closest('a')
        expect(link).toHaveAttribute('href', item.href)
      })
    })
  })

  describe('Active State Logic', () => {
    it('should highlight home link when on homepage', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      const homeLink = screen.getByText('Dashbord').closest('a')
      expect(homeLink).toHaveClass('text-gray-100')
    })

    it('should not highlight home link when on other pages', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/search')
      render(<NavItems />)
      
      const homeLink = screen.getByText('Dashbord').closest('a')
      expect(homeLink).not.toHaveClass('text-gray-100')
    })

    it('should highlight search link when on search page', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/search')
      render(<NavItems />)
      
      const searchLink = screen.getByText('Search').closest('a')
      expect(searchLink).toHaveClass('text-gray-100')
    })

    it('should highlight search link when on search subpages', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/search/results')
      render(<NavItems />)
      
      const searchLink = screen.getByText('Search').closest('a')
      expect(searchLink).toHaveClass('text-gray-100')
    })

    it('should highlight watchlist link when on watchlist page', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/warchlist')
      render(<NavItems />)
      
      const watchlistLink = screen.getByText('Watchlist').closest('a')
      expect(watchlistLink).toHaveClass('text-gray-100')
    })

    it('should highlight watchlist link when on watchlist subpages', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/warchlist/details')
      render(<NavItems />)
      
      const watchlistLink = screen.getByText('Watchlist').closest('a')
      expect(watchlistLink).toHaveClass('text-gray-100')
    })

    it('should only highlight one item at a time', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/search')
      render(<NavItems />)
      
      const activeLinks = screen.getAllByRole('link').filter((link) =>
        link.className.includes('text-gray-100')
      )
      expect(activeLinks).toHaveLength(1)
    })
  })

  describe('isActive Function Logic', () => {
    it('should treat root path specially', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      const homeLink = screen.getByText('Dashbord').closest('a')
      expect(homeLink).toHaveClass('text-gray-100')
    })

    it('should not activate home on non-root paths', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/search')
      render(<NavItems />)
      
      const homeLink = screen.getByText('Dashbord').closest('a')
      expect(homeLink).not.toHaveClass('text-gray-100')
    })

    it('should use startsWith for non-root paths', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/search/advanced')
      render(<NavItems />)
      
      const searchLink = screen.getByText('Search').closest('a')
      expect(searchLink).toHaveClass('text-gray-100')
    })
  })

  describe('Styling Classes', () => {
    it('should have hover effect class on all links', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      const links = screen.getAllByRole('link')
      links.forEach((link) => {
        expect(link).toHaveClass('hover:text-yellow-500')
        expect(link).toHaveClass('transition-colors')
      })
    })

    it('should have correct flex layout classes on ul', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      const list = screen.getByRole('list')
      expect(list).toHaveClass('flex', 'flex-col', 'sm:flex-row')
    })

    it('should have correct gap and font classes on ul', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      const list = screen.getByRole('list')
      expect(list).toHaveClass('gap-3', 'sm:gap-10', 'font-medium')
    })
  })

  describe('Edge Cases', () => {
    it('should handle undefined pathname gracefully', () => {
      ;(usePathname as jest.Mock).mockReturnValue(undefined)
      expect(() => render(<NavItems />)).not.toThrow()
    })

    it('should handle empty pathname', () => {
      ;(usePathname as jest.Mock).mockReturnValue('')
      expect(() => render(<NavItems />)).not.toThrow()
    })

    it('should handle pathname with trailing slash', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/search/')
      render(<NavItems />)
      
      const searchLink = screen.getByText('Search').closest('a')
      expect(searchLink).toHaveClass('text-gray-100')
    })

    it('should handle complex nested paths', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/warchlist/item/123/edit')
      render(<NavItems />)
      
      const watchlistLink = screen.getByText('Watchlist').closest('a')
      expect(watchlistLink).toHaveClass('text-gray-100')
    })
  })

  describe('Accessibility', () => {
    it('should render semantic list structure', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      expect(screen.getByRole('list')).toBeInTheDocument()
      expect(screen.getAllByRole('listitem')).toHaveLength(NAV_ITEMS.length)
    })

    it('should have accessible links', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      const links = screen.getAllByRole('link')
      links.forEach((link) => {
        expect(link).toHaveAttribute('href')
        expect(link.textContent).toBeTruthy()
      })
    })
  })

  describe('Dynamic Updates', () => {
    it('should update active state when pathname changes', () => {
      const { rerender } = render(<NavItems />)
      ;(usePathname as jest.Mock).mockReturnValue('/')
      
      rerender(<NavItems />)
      let homeLink = screen.getByText('Dashbord').closest('a')
      expect(homeLink).toHaveClass('text-gray-100')
      
      ;(usePathname as jest.Mock).mockReturnValue('/search')
      rerender(<NavItems />)
      
      homeLink = screen.getByText('Dashbord').closest('a')
      expect(homeLink).not.toHaveClass('text-gray-100')
      
      const searchLink = screen.getByText('Search').closest('a')
      expect(searchLink).toHaveClass('text-gray-100')
    })
  })

  describe('Integration with NAV_ITEMS', () => {
    it('should handle changes in NAV_ITEMS constant', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      const listItems = screen.getAllByRole('listitem')
      expect(listItems.length).toBe(NAV_ITEMS.length)
    })

    it('should use key prop correctly', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      const { container } = render(<NavItems />)
      
      const listItems = container.querySelectorAll('li')
      listItems.forEach((item, index) => {
        expect(item.querySelector('a')).toHaveAttribute('href', NAV_ITEMS[index].href)
      })
    })
  })
})