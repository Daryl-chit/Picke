import { LayoutAnimation, Platform } from 'react-native'

export const LayoutSpring = {
  duration: 550,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.opacity,
    springDamping: 0.55
  },
  update: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.65
  },
  delete: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.opacity,
    springDamping: 0.61
  }
}

export const LayoutScale = {
  duration: 500,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.65
  },
  update: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.8
  },
  delete: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.6
  }
}

export const ExpandSpring = {
  duration: 599,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.75
  },
  update: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.8
  },
  delete: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.85
  }
}

export const SpringOpacity = {
  duration: 699,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.opacity,
    springDamping: 0.78
  },
  update: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.opacity,
    springDamping: 0.8
  },
  delete: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.opacity,
    springDamping: 0.85
  }
}

export const EaseScale = {
  duration: 490,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.scaleXY
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  }
}

export const EaseOpacity = {
  duration: 430,
  create: {
    type: LayoutAnimation.Types.easeIn,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  },
  delete: {
    type: LayoutAnimation.Types.easeOut,
    property: LayoutAnimation.Properties.opacity
  }
}

export const CurveOpacity = {
  duration: 650,
  create: {
    type: LayoutAnimation.Types.curveEaseInEaseOut,
    property: 'opacity'
  },
  update: {
    type: LayoutAnimation.Types.curveEaseInEaseOut,
    property: 'opacity'
  },
  delete: {
    type: LayoutAnimation.Types.curveEaseInEaseOut,
    property: 'opacity'
  }
}

export const LayoutMixed = {
  duration: 750,
  create: {
    type: LayoutAnimation.Types.easeIn,
    property: 'scaleXY'
  },
  update: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.opacity,
    springDamping: 0.66
  },
  delete: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.opacity,
    springDamping: 0.77
  }
}

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const types = [
  'spring',
  'easeIn',
  'easeOut',
  // 'linear',
  'easeInEaseOut'
]

const properties = [
  LayoutAnimation.Properties.scaleXY,
  LayoutAnimation.Properties.opacity
]

export const RandomConfig = () => {
  const duration = random(355, 422)
  const createType = types[random(0, types.length - 1)]
  const updateType = types[random(0, types.length - 1)]
  const deleteType = types[random(0, types.length - 1)]
  // console.log('RandomConfig', createType, updateType, deleteType)
  return {
    duration: duration,
    create: {
      type: createType,
      property: properties[random(0, properties.length - 1)],
      springDamping: createType !== 'spring' ? null : random(45, 90) / 100
    },
    update: {
      type: updateType,
      property: properties[random(0, properties.length - 1)],
      springDamping: createType !== 'spring' ? null : random(45, 84) / 100
    },
    delete: {
      type: deleteType,
      property: LayoutAnimation.Properties.opacity,
      springDamping: createType !== 'spring' ? null : random(45, 90) / 100
    }
  }
}

export const PickedConfigs = [
  LayoutScale,
  LayoutSpring,
  ExpandSpring,
  EaseOpacity,
  LayoutMixed
]

export const PickConfig = (id) => {
  const randomName = id || random(0, PickedConfigs.length - 1)
  const config = PickedConfigs[randomName]
  // console.log({ randomName, config })
  return config
}
export default {
  LayoutSpring,
  LayoutScale,
  LayoutMixed,
  CurveOpacity,
  RandomConfig,
  PickedConfigs,
  PickConfig,
  EaseScale,
  EaseOpacity,
  SpringOpacity
}
