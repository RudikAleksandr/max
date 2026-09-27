import type {
  ComponentProps,
  ReactNode
} from 'react'
import type { ParsedCountry } from 'react-international-phone'

import ChevronDownIcon from '@/shared/assets/icons/chevron-down.svg?react'

import styles from './CountryButton.module.scss'

interface CountryButtonProps {
  country: ParsedCountry
  rootProps: ComponentProps<'button'>
  children: ReactNode
}

export function CountryButton({
  country,
  rootProps,
  children
}: CountryButtonProps) {
  return (
    <button
      {...rootProps}
      type="button"
      className={styles.country}
      aria-label={`Страна: ${country.name}`}
    >
      {children}
      <span>
        {`+${country.dialCode}`}
      </span>
      <ChevronDownIcon className={styles.chevron} />
    </button>
  )
}
