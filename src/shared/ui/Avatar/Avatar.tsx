import classNames from 'classnames/bind'
import {
  type ComponentType,
  type SVGProps,
  useState
} from 'react'

import PersonIcon from '@/shared/assets/icons/person.svg?react'

import styles from './Avatar.module.scss'
import {
  getGradient,
  getInitials
} from './utils'

const cx = classNames.bind(styles)

interface AvatarProps {
  id: string
  name: string
  size?: 'medium' | 'large'
  src?: string
  Icon?: ComponentType<SVGProps<SVGSVGElement>>
}

export function Avatar({
  id,
  name,
  size = 'medium',
  src,
  Icon
}: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string>()
  const hasPhoto = Boolean(src) && src !== failedSrc

  function handlePhotoError() {
    setFailedSrc(src)
  }

  if (Icon) {
    return (
      <span
        className={cx('avatar', 'accent', size)}
        aria-hidden="true"
      >
        <Icon className={styles.glyph} />
      </span>
    )
  }

  return (
    <span
      className={cx('avatar', size)}
      style={{
        background: getGradient(id)
      }}
      aria-hidden="true"
    >
      {getInitials(name) || <PersonIcon className={styles.icon} />}
      {hasPhoto && (
        <img
          className={styles.photo}
          src={src}
          alt=""
          onError={handlePhotoError}
        />
      )}
    </span>
  )
}
