import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import UserDropDownMenu from '@/components/user-dropdow-menu'

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/components/nav-items', () => {
  return function NavItems() {
    return <div data-testid="nav-items-mobile">NavItems</div>
  }
})

jest.mock('lucide-react', () => ({
  LogOut: () => <svg data-testid="logout-icon">LogOut Icon</svg>,
}))

describe('UserDropDownMenu Component', () => {
  const mockPush = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
    })
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<UserDropDownMenu />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render the trigger button', () => {
      render(<UserDropDownMenu />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('flex', 'items-center', 'gap-3')
    })

    it('should display user name in trigger', () => {
      render(<UserDropDownMenu />)
      expect(screen.getByText('Youssef')).toBeInTheDocument()
    })

    it('should display user avatar', () => {
      const { container } = render(<UserDropDownMenu />)
      // Avatar should be present
      const avatarImage = container.querySelector('[alt="@shadcn"]')
      expect(avatarImage).toBeInTheDocument()
    })

    it('should display avatar fallback with first letter', () => {
      render(<UserDropDownMenu />)
      // Should show 'Y' from 'Youssef'
      const fallbacks = screen.getAllByText('Y')
      expect(fallbacks.length).toBeGreaterThan(0)
    })
  })

  describe('User Information Display', () => {
    it('should display correct user name', () => {
      render(<UserDropDownMenu />)
      const nameElements = screen.getAllByText('Youssef')
      expect(nameElements.length).toBeGreaterThan(0)
    })

    it('should use hardcoded user data', () => {
      render(<UserDropDownMenu />)
      // Check that both name and email are present
      expect(screen.getByText('Youssef')).toBeInTheDocument()
      expect(screen.getByText('youssefbriki66@gmail.com')).toBeInTheDocument()
    })

    it('should display email in dropdown content', () => {
      render(<UserDropDownMenu />)
      const email = screen.getByText('youssefbriki66@gmail.com')
      expect(email).toBeInTheDocument()
    })

    it('should generate correct avatar fallback from username', () => {
      render(<UserDropDownMenu />)
      // User name is "Youssef", so fallback should be "Y"
      const fallbacks = screen.getAllByText('Y')
      expect(fallbacks.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Dropdown Menu Content', () => {
    it('should render dropdown menu label with user info', () => {
      render(<UserDropDownMenu />)
      // Label should contain user name and email
      expect(screen.getByText('Youssef')).toBeInTheDocument()
      expect(screen.getByText('youssefbriki66@gmail.com')).toBeInTheDocument()
    })

    it('should render logout menu item', () => {
      render(<UserDropDownMenu />)
      const logoutItem = screen.getByText('LogOut')
      expect(logoutItem).toBeInTheDocument()
    })

    it('should render logout icon', () => {
      render(<UserDropDownMenu />)
      expect(screen.getByTestId('logout-icon')).toBeInTheDocument()
    })

    it('should render mobile navigation', () => {
      render(<UserDropDownMenu />)
      expect(screen.getByTestId('nav-items-mobile')).toBeInTheDocument()
    })

    it('should render separators', () => {
      const { container } = render(<UserDropDownMenu />)
      const separators = container.querySelectorAll('[class*="bg-gray-600"]')
      expect(separators.length).toBeGreaterThan(0)
    })
  })

  describe('Logout Functionality', () => {
    it('should call router.push when logout is clicked', async () => {
      const user = userEvent.setup()
      render(<UserDropDownMenu />)
      
      const logoutItem = screen.getByText('LogOut')
      await user.click(logoutItem)
      
      expect(mockPush).toHaveBeenCalledWith('/sign-in')
    })

    it('should navigate to sign-in page on logout', async () => {
      const user = userEvent.setup()
      render(<UserDropDownMenu />)
      
      const logoutItem = screen.getByText('LogOut')
      await user.click(logoutItem)
      
      expect(mockPush).toHaveBeenCalledTimes(1)
      expect(mockPush).toHaveBeenCalledWith('/sign-in')
    })

    it('should handle logout click without errors', async () => {
      const user = userEvent.setup()
      render(<UserDropDownMenu />)
      
      const logoutItem = screen.getByText('LogOut')
      
      await expect(user.click(logoutItem)).resolves.not.toThrow()
    })
  })

  describe('Styling and Classes', () => {
    it('should have correct button styling', () => {
      render(<UserDropDownMenu />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('flex', 'items-center', 'gap-3')
    })

    it('should have ghost variant on button', () => {
      const { container } = render(<UserDropDownMenu />)
      const button = container.querySelector('button')
      expect(button?.getAttribute('class')).toContain('ghost')
    })

    it('should have correct dropdown content styling', () => {
      const { container } = render(<UserDropDownMenu />)
      const content = container.querySelector('[class*="text-gray-400"]')
      expect(content).toBeInTheDocument()
    })

    it('should have correct avatar styling', () => {
      const { container } = render(<UserDropDownMenu />)
      const avatar = container.querySelector('[class*="h-8 w-8"]')
      expect(avatar).toBeInTheDocument()
    })

    it('should have yellow accent colors', () => {
      const { container } = render(<UserDropDownMenu />)
      const yellowElements = container.querySelectorAll('[class*="yellow"]')
      expect(yellowElements.length).toBeGreaterThan(0)
    })
  })

  describe('Responsive Behavior', () => {
    it('should hide user name on small screens', () => {
      const { container } = render(<UserDropDownMenu />)
      const nameContainer = container.querySelector('.hidden.md\\:flex')
      expect(nameContainer).toBeInTheDocument()
    })

    it('should show mobile navigation on small screens only', () => {
      const { container } = render(<UserDropDownMenu />)
      const mobileNav = container.querySelector('nav.sm\\:hidden')
      expect(mobileNav).toBeInTheDocument()
    })

    it('should hide logout icon on small screens', () => {
      const { container } = render(<UserDropDownMenu />)
      const logoutIcon = screen.getByTestId('logout-icon').closest('svg')
      expect(logoutIcon).toHaveClass('hidden', 'sm:block')
    })

    it('should hide separator on small screens', () => {
      const { container } = render(<UserDropDownMenu />)
      const separators = container.querySelectorAll('.hidden.sm\\:block')
      expect(separators.length).toBeGreaterThan(0)
    })
  })

  describe('Avatar Component', () => {
    it('should render two avatars (trigger and dropdown)', () => {
      const { container } = render(<UserDropDownMenu />)
      const avatars = container.querySelectorAll('[class*="rounded-full"]')
      expect(avatars.length).toBeGreaterThanOrEqual(2)
    })

    it('should have different sizes for avatars', () => {
      const { container } = render(<UserDropDownMenu />)
      const smallAvatar = container.querySelector('.h-8.w-8')
      const largeAvatar = container.querySelector('.h-10.w-10')
      expect(smallAvatar).toBeInTheDocument()
      expect(largeAvatar).toBeInTheDocument()
    })

    it('should use correct avatar image URL', () => {
      const { container } = render(<UserDropDownMenu />)
      const avatarImages = container.querySelectorAll('[src="https://github.com/shadcn.png"]')
      expect(avatarImages.length).toBeGreaterThanOrEqual(1)
    })

    it('should have fallback with correct styling', () => {
      const { container } = render(<UserDropDownMenu />)
      const fallbacks = container.querySelectorAll('.bg-yellow-500')
      expect(fallbacks.length).toBeGreaterThan(0)
    })
  })

  describe('Integration with Router', () => {
    it('should use Next.js router hook', () => {
      render(<UserDropDownMenu />)
      expect(useRouter).toHaveBeenCalled()
    })

    it('should handle router being undefined', () => {
      ;(useRouter as jest.Mock).mockReturnValue(undefined)
      expect(() => render(<UserDropDownMenu />)).toThrow()
    })

    it('should handle missing push method', () => {
      ;(useRouter as jest.Mock).mockReturnValue({})
      expect(() => render(<UserDropDownMenu />)).toThrow()
    })
  })

  describe('Edge Cases', () => {
    it('should handle user with single character name', () => {
      render(<UserDropDownMenu />)
      // Should still display 'Y' fallback
      const fallbacks = screen.getAllByText('Y')
      expect(fallbacks.length).toBeGreaterThan(0)
    })

    it('should render even with hardcoded data', () => {
      render(<UserDropDownMenu />)
      expect(screen.getByText('Youssef')).toBeInTheDocument()
      expect(screen.getByText('youssefbriki66@gmail.com')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have accessible button', () => {
      render(<UserDropDownMenu />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should have alt text on avatar images', () => {
      const { container } = render(<UserDropDownMenu />)
      const images = container.querySelectorAll('img[alt="@shadcn"]')
      images.forEach((img) => {
        expect(img).toHaveAttribute('alt')
      })
    })

    it('should have meaningful text content', () => {
      render(<UserDropDownMenu />)
      expect(screen.getByText('LogOut')).toBeInTheDocument()
      expect(screen.getByText('Youssef')).toBeInTheDocument()
    })
  })

  describe('Menu Items', () => {
    it('should have correct classes on logout menu item', () => {
      const { container } = render(<UserDropDownMenu />)
      const logoutItem = screen.getByText('LogOut').closest('[class*="text-gray-100"]')
      expect(logoutItem).toBeInTheDocument()
    })

    it('should have cursor pointer on logout item', () => {
      render(<UserDropDownMenu />)
      const logoutItem = screen.getByText('LogOut').closest('[class*="cursor-pointer"]')
      expect(logoutItem).toBeInTheDocument()
    })
  })
})