import React from 'react'

import IconShuffle from './shuffle'
import IconDefault from './default'
import IconBackwardStep from './backward-step'
import IconCirclePause from './circle-pause'
import IconForwardStep from './forward-step'
import IconRepeatSquare from './repeat-square-icon'
import IconFireDancer from './firedancer'
import IconTShirt from './shirt-shortsleeve'

import * as styles from './icons.module.css'

function Icons({ name, additionalClasses }) {
  switch (name) {
    case 'backward-step':
      return <IconBackwardStep className={`${styles.icon} ${additionalClasses}`} />
    case 'circle-pause':
      return <IconCirclePause className={`${styles.icon} ${additionalClasses}`} />
    case 'fire-dancer':
      return <IconFireDancer className={`${styles.icon} ${additionalClasses}`} />
    case 'forward-step':
      return <IconForwardStep className={`${styles.icon} ${additionalClasses}`} />
    case 'repeat-square':
      return <IconRepeatSquare className={`${styles.icon} ${additionalClasses}`} />
    case 'shuffle':
      return <IconShuffle className={`${styles.icon} ${additionalClasses}`} />
    case 'tshirt':
      return <IconTShirt className={`${styles.tshirt} ${additionalClasses}`} />
    default:
      return <IconDefault className={`${styles.icon} ${additionalClasses}`} />
  }
}

export default Icons
