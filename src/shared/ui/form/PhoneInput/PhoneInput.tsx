import 'react-international-phone/style.css'

import classNames from 'classnames/bind'
import {
  type ClipboardEvent,
  useCallback
} from 'react'
import {
  type CountryData,
  type CountryIso2,
  CountrySelector,
  type CountrySelectorProps,
  parseCountry,
  type ParsedCountry,
  usePhoneInput
} from 'react-international-phone'

import { keepDigits } from '@/shared/lib'
import {
  Field,
  useFieldControl
} from '@/shared/ui/form/Field'

import { CountryButton } from './components/CountryButton'
import styles from './PhoneInput.module.scss'
import {
  countMaskDigits,
  getExampleNumber,
  getMask
} from './utils'

const cx = classNames.bind(styles)

type ButtonWrapperProps = Parameters<
  NonNullable<CountrySelectorProps['renderButtonWrapper']>
>[0]

interface PhoneInputProps {
  label: string
  error?: string
  countries: CountryData[]
  defaultCountry: CountryIso2
  value: string
  onChange: (phone: string) => void
  onBlur?: () => void
  name?: string
  ref?: (element: HTMLInputElement | null) => void
  toInternational?: (digits: string) => string
}

export function PhoneInput({
  label,
  error,
  countries,
  defaultCountry,
  value,
  onChange,
  onBlur,
  name,
  ref,
  toInternational = (digits) => digits
}: PhoneInputProps) {
  const controlProps = useFieldControl(error)

  const {
    inputValue,
    country,
    setCountry,
    handlePhoneValueChange,
    inputRef
  } = usePhoneInput({
    defaultCountry,
    countries,
    value,
    disableDialCodeAndPrefix: true,
    disableCountryGuess: true,
    onChange: (data) => {
      const phone = data.inputValue
        ? data.phone
        : ''

      onChange(phone)
    }
  })

  const mask = getMask(country)

  const setInputRef = useCallback(
    (element: HTMLInputElement | null) => {
      inputRef.current = element
      ref?.(element)
    },
    [inputRef, ref]
  )

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    const text = event.clipboardData.getData('text')
    const hasPlus = text.trim().startsWith('+')
    const digits = keepDigits(text)
    const nationalLength = countMaskDigits(mask)
    const isNationalNumber = !hasPlus && digits.length <= nationalLength

    if (isNationalNumber) {
      return
    }

    event.preventDefault()

    const international = hasPlus
      ? digits
      : toInternational(digits)

    const match = [country, ...countries.map(parseCountry)].find(
      ({ dialCode }) => international.startsWith(dialCode)
    )

    if (!match) {
      return
    }

    setCountry(match.iso2)
    onChange(`+${international}`)
  }

  function handleSelectCountry({ iso2 }: ParsedCountry) {
    setCountry(iso2, {
      focusOnInput: true
    })
  }

  function renderCountryButton({ children, rootProps }: ButtonWrapperProps) {
    return (
      <CountryButton country={country} rootProps={rootProps}>
        {children}
      </CountryButton>
    )
  }

  const example = getExampleNumber(mask)

  const hint = inputValue
    ? example.slice(inputValue.length)
    : ''

  return (
    <Field
      label={label}
      error={error}
      controlId={controlProps.id}
    >
      <div className={cx(
        'control',
        { invalid: error }
      )}
      >
        <CountrySelector
          className={styles.selector}
          selectedCountry={country.iso2}
          countries={countries}
          onSelect={handleSelectCountry}
          flagClassName={styles.flag}
          dropdownArrowClassName={styles.libraryArrow}
          dropdownStyleProps={{
            className: styles.dropdown,
            listItemClassName: styles.option,
            listItemFlagClassName: styles.flag,
            listItemCountryNameClassName: styles.optionName
          }}
          renderButtonWrapper={renderCountryButton}
        />
        <div className={styles.number}>
          <input
            {...controlProps}
            ref={setInputRef}
            name={name}
            type="tel"
            autoComplete="off"
            className={styles.input}
            value={inputValue}
            placeholder={example}
            onChange={handlePhoneValueChange}
            onPaste={handlePaste}
            onBlur={onBlur}
          />
          {hint && (
            <span
              className={styles.hint}
              aria-hidden="true"
            >
              <span className={styles.typed}>
                {inputValue}
              </span>
              {hint}
            </span>
          )}
        </div>
      </div>
    </Field>
  )
}
