import { AnimateSharedLayout, motion } from 'framer-motion'
import { font as pallyVariable } from '../fonts/generated/Pally-Variable.module.css'
import { font as synonymVariable } from '../fonts/generated/Synonym-Variable.module.css'
import { font as sourceSerifProRegular } from '../fonts/generated/SourceSerifPro-Regular.module.css'
import { font as ibmPlexMonoRegular } from '../fonts/generated/IBMPlexMono-Regular.module.css'
import { font as ibmPlexMonoSemiBold } from '../fonts/generated/IBMPlexMono-SemiBold.module.css'
import { usePrevious } from '@/hooks/usePrevious'
import { useCallback, useEffect, useRef, useState } from 'react'
import debounce from 'debounce'
import dlv from 'dlv'
import { fit } from '@/utils/fit'
import clsx from 'clsx'
import colors from 'tailwindcss/colors'

const themes = {
  Simple: {
    wrapper: { borderRadius: 12 },
    container: '',
    image: {
      width({ containerWidth, col }, css = false) {
        if (!containerWidth) return 192
        if (css) {
          return col ? '100%' : '192px'
        } else {
          return col ? containerWidth : 192
        }
      },
      height({ containerWidth, col }) {
        if (!containerWidth) return 305
        return col ? 191 : 305
      },
      borderRadius: [
        [8, 8, 0, 0],
        [8, 8, 0, 0],
        [8, 0, 0, 8],
      ],
      src: require('@/img/classic-utility-jacket.jpg').default.src,
      originalWidth: 1200,
      originalHeight: 1600,
      loading: 'lazy',
    },
    contentContainer: 'p-6',
    header: '-mt-6 pt-6 pb-6',
    heading: 'flex-auto',
    stock: 'flex-none w-full mt-2',
    button: {
      grid: ['1fr auto', '1fr 1fr auto', 'auto auto 1fr'],
      height: 42,
      borderRadius: 8,
      className: 'px-6',
      primary: {
        class: ['col-span-2', '', ''],
        backgroundColor: colors.gray[900],
        text: 'text-white font-semibold',
      },
      secondary: {
        backgroundColor: colors.white,
        borderColor: colors.gray[200],
        text: 'text-gray-900 font-semibold',
      },
      like: {
        color: colors.gray[300],
      },
    },
    size: {
      container: '',
      list: 'space-x-3',
      button: {
        activeFont: 'font-semibold',
        size: 38,
        borderRadius: 8,
        color: colors.gray[700],
        activeBackgroundColor: colors.gray[900],
        activeColor: colors.white,
      },
    },
    smallprint: {
      container: ['mt-6', 'mt-6', 'mt-6 mb-1'],
      inner: 'text-sm text-gray-700',
    },
  }
}

const imageAnimationVariants = {
  visible: { opacity: [0, 1], zIndex: 2 },
  prev: { zIndex: 1 },
  hidden: { zIndex: 0 },
}

export function HtmlZenGarden({ theme }) {
  const prevTheme = usePrevious(theme)
  const [{ width: containerWidth, col, above }, setContainerState] = useState({
    width: 0,
    col: false,
  })
  const containerRef = useRef()

  const updateWidth = useCallback(
    debounce(() => {
      if (!containerRef.current) return
      const newWidth = Math.round(containerRef.current.getBoundingClientRect().width)
      const newCol =
        window.innerWidth < 640
          ? 'sm'
          : window.innerWidth >= 1024 && window.innerWidth < 1280
          ? 'lg'
          : false
      const newAbove = window.innerWidth < 1024
      if (newWidth !== containerWidth || newCol !== col || newAbove !== above) {
        setContainerState({ width: newWidth, col: newCol, above: newAbove })
      }
    }, 300)
  )

  useEffect(() => {
    const observer = new window.ResizeObserver(updateWidth)
    observer.observe(containerRef.current)
    updateWidth()
    return () => {
      observer.disconnect()
    }
  }, [containerWidth, col, updateWidth])

  const getThemeValue = (key, defaultValue) => {
    const value = dlv(themes[theme], key, defaultValue)
    return Array.isArray(value) ? value[col === 'sm' ? 0 : col === 'lg' ? 1 : 2] : value
  }

  const getImageRadius = (key) => {
    let radius = themes[theme].image.borderRadius
    if (!Array.isArray(radius)) {
      return {
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        borderBottomRightRadius: radius,
        borderBottomLeftRadius: radius,
      }
    }
    if (Array.isArray(radius[0])) {
      radius = radius[col === 'sm' ? 0 : col === 'lg' ? 1 : 2]
    }
    if (!Array.isArray(radius)) {
      return {
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        borderBottomRightRadius: radius,
        borderBottomLeftRadius: radius,
      }
    }
    return {
      borderTopLeftRadius: radius[0],
      borderTopRightRadius: radius[1],
      borderBottomRightRadius: radius[2],
      borderBottomLeftRadius: radius[3],
    }
  }

  return (
    <AnimateSharedLayout>
      <div ref={containerRef} className="relative z-10 my-auto">
        {!containerWidth ? (
          <div className="bg-white rounded-tl-xl sm:rounded-t-xl lg:rounded-xl shadow-xl h-[498px] sm:h-[256px] lg:h-[448px] xl:h-[256px]" />
        ) : (
          <motion.div
            layout
            className="relative shadow-xl flex leading-none"
            initial={false}
            animate={{ borderRadius: getThemeValue('wrapper.borderRadius') }}
          >
            <motion.div
              layout
              className={`bg-white flex w-full ${col ? 'flex-col' : ''} ${getThemeValue(
                'container'
              )}`}
              initial={false}
              animate={{ borderRadius: getThemeValue('wrapper.borderRadius') }}
            >
              <div className="relative flex-none sm:self-start lg:self-auto xl:self-start">
                <motion.div
                  layout
                  className={clsx(
                    'relative z-20 overflow-hidden flex-none',
                    getThemeValue('image.className')
                  )}
                  style={{
                    width: themes[theme].image.width({ containerWidth, col }, true),
                    height: themes[theme].image.height({ containerWidth, col }),
                  }}
                  initial={false}
                  animate={getImageRadius(theme)}
                >
                  {Object.keys(themes).map((name, i) => (
                    <motion.img
                      layout
                      key={name}
                      src={themes[name].image.src}
                      alt=""
                      decoding="async"
                      loading={themes[name].image.loading}
                      className="absolute max-w-none"
                      style={fit(
                        themes[theme].image.width({ containerWidth, col }),
                        themes[theme].image.height({ containerWidth, col }),
                        themes[name].image.originalWidth,
                        themes[name].image.originalHeight
                      )}
                      initial={i === 0 ? 'visible' : 'hidden'}
                      animate={theme === name ? 'visible' : prevTheme === name ? 'prev' : 'hidden'}
                      variants={imageAnimationVariants}
                    />
                  ))}
                </motion.div>
                <motion.div
                  layout
                  className={clsx(
                    'absolute z-10 bg-teal-400',
                    theme === 'Brutalist' ? 'top-1 left-1 -right-1 -bottom-1' : 'inset-px'
                  )}
                  initial={false}
                  animate={getImageRadius(theme)}
                />
              </div>
              <div
                className={`self-start flex-auto flex flex-wrap items-baseline ${getThemeValue(
                  'contentContainer'
                )}`}
              >
                <div
                  className={`w-full relative flex flex-wrap items-baseline ${
                    getThemeValue('header') || ''
                  }`}
                >
                  <motion.div
                    layout
                    className="absolute -top-44 sm:-top-0 lg:-top-44 xl:top-0 bottom-0 -left-6 -right-6 sm:-left-60 sm:-right-6 lg:-left-6 lg:-right-6 xl:-left-60 xl:-right-6 bg-black"
                    initial={false}
                    animate={{ opacity: theme === 'Brutalist' ? 1 : 0 }}
                  />
                  <div className={`relative ${themes[theme].heading}`}>
                    <motion.h2
                      layout
                      className={clsx(
                        'inline-flex text-gray-900 text-lg font-semibold',
                        theme === 'Simple' ? '' : 'absolute bottom-0 left-0'
                      )}
                      initial={false}
                      animate={{ opacity: theme === 'Simple' ? 1 : 0 }}
                    >
                      <span className="hidden sm:inline whitespace-pre">Classic </span>Utility
                      Jacket
                    </motion.h2>
                    <motion.h2
                      layout
                      className={clsx(
                        'inline-flex text-gray-900 text-base font-medium',
                        pallyVariable,
                        theme === 'Playful' ? '' : 'absolute bottom-0 left-0'
                      )}
                      initial={false}
                      animate={{ opacity: theme === 'Playful' ? 1 : 0 }}
                    >
                      Kids Jumpsuit
                    </motion.h2>
                    <motion.h2
                      layout
                      className={clsx(
                        'inline-flex text-gray-900 text-2xl leading-none',
                        sourceSerifProRegular,
                        theme === 'Elegant' ? '' : 'absolute bottom-0 left-0'
                      )}
                      initial={false}
                      animate={{ opacity: theme === 'Elegant' ? 1 : 0 }}
                    >
                      Dogtooth Style Jacket
                    </motion.h2>
                    <motion.h2
                      layout
                      className={clsx(
                        'inline-flex text-white text-2xl',
                        ibmPlexMonoSemiBold,
                        theme === 'Brutalist' ? '' : 'absolute bottom-0 left-0'
                      )}
                      initial={false}
                      animate={{ opacity: theme === 'Brutalist' ? 1 : 0 }}
                    >
                      Retro Shoe
                    </motion.h2>
                  </div>
                  <div className={clsx('relative', themes[theme].price)}>
                    <motion.div
                      className={`inline-flex text-lg font-semibold ${
                        theme === 'Simple' ? '' : 'absolute bottom-0 left-0'
                      }`}
                      layout
                      initial={false}
                      animate={{ opacity: theme === 'Simple' ? 1 : 0 }}
                    >
                      $110.00
                    </motion.div>
                    <motion.div
                      className={`inline-flex text-3xl font-bold text-violet-600 ${pallyVariable} ${
                        theme === 'Playful' ? '' : 'absolute bottom-0 left-0'
                      }`}
                      layout
                      initial={false}
                      animate={{ opacity: theme === 'Playful' ? 1 : 0 }}
                    >
                      $39.00
                    </motion.div>
                    <motion.div
                      className={clsx(
                        'inline-flex text-lg text-gray-500 font-medium',
                        synonymVariable,
                        theme === 'Elegant' ? '' : 'absolute bottom-0 left-0'
                      )}
                      layout
                      initial={false}
                      animate={{ opacity: theme === 'Elegant' ? 1 : 0 }}
                    >
                      $350.00
                    </motion.div>
                    <motion.div
                      className={clsx(
                        'inline-flex text-white text-base',
                        ibmPlexMonoSemiBold,
                        theme === 'Brutalist' ? '' : 'absolute bottom-0 left-0'
                      )}
                      layout
                      initial={false}
                      animate={{ opacity: theme === 'Brutalist' ? 1 : 0 }}
                    >
                      $89.00
                    </motion.div>
                  </div>
                  <div className={clsx('relative whitespace-nowrap', themes[theme].stock)}>
                    <motion.div
                      layout
                      initial={false}
                      animate={{ opacity: theme === 'Simple' ? 1 : 0 }}
                      className={`inline-flex text-sm font-medium text-gray-700 ${
                        theme === 'Simple' ? '' : 'absolute bottom-0 left-0'
                      }`}
                    >
                      In stock
                    </motion.div>
                    <motion.div
                      layout
                      initial={false}
                      animate={{ opacity: theme === 'Playful' ? 1 : 0 }}
                      className={`inline-flex text-base font-medium text-gray-400 ${pallyVariable} ${
                        theme === 'Playful' ? '' : 'absolute bottom-0 left-0'
                      }`}
                    >
                      In stock
                    </motion.div>
                    <motion.div
                      layout
                      initial={false}
                      animate={{ opacity: theme === 'Elegant' ? 1 : 0 }}
                      className={`inline-flex text-xs leading-6 text-gray-500 font-medium uppercase ${synonymVariable} ${
                        theme === 'Elegant' ? '' : 'absolute bottom-0 left-0'
                      }`}
                    >
                      In stock
                    </motion.div>
                    <motion.div
                      layout
                      initial={false}
                      animate={{ opacity: theme === 'Brutalist' ? 1 : 0 }}
                      className={clsx(
                        'inline-flex text-teal-400 text-base uppercase',
                        ibmPlexMonoRegular,
                        theme === 'Brutalist' ? '' : 'absolute bottom-0 left-0'
                      )}
                    >
                      In stock
                    </motion.div>
                  </div>
                </div>
                <div
                  className={clsx(
                    'w-full flex-none flex items-center',
                    getThemeValue('size.container')
                  )}
                >
                  <motion.ul className={clsx('flex text-sm', themes[theme].size.list)}>
                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                      <motion.li
                        layout
                        key={size}
                        className="relative flex-none flex items-center justify-center cursor-pointer"
                        style={{
                          width: themes[theme].size.button.size,
                          height: themes[theme].size.button.size,
                        }}
                        initial={false}
                        animate={{
                          color:
                            size === 'XS'
                              ? themes[theme].size.button.activeColor
                              : themes[theme].size.button.color,
                        }}
                      >
                        {size === 'XS' && (
                          <motion.div
                            layout
                            initial={false}
                            className={clsx(
                              'absolute bg-teal-400',
                              theme === 'Brutalist'
                                ? 'top-0.5 left-0.5 -right-0.5 -bottom-0.5'
                                : 'inset-px'
                            )}
                            animate={{
                              borderRadius: themes[theme].size.button.borderRadius,
                            }}
                          />
                        )}
                        <motion.div
                          layout
                          initial={false}
                          className="absolute inset-0 border-2"
                          animate={{
                            borderRadius: themes[theme].size.button.borderRadius,
                            borderColor:
                              (size === 'XS'
                                ? themes[theme].size.button.activeBorderColor
                                : themes[theme].size.button.borderColor) ||
                              (size === 'XS'
                                ? themes[theme].size.button.activeBackgroundColor
                                : '#fff'),
                            ...(size === 'XS'
                              ? {
                                  backgroundColor: themes[theme].size.button.activeBackgroundColor,
                                }
                              : {}),
                          }}
                        />
                        {Object.keys(themes).map((name) => (
                          <motion.span
                            key={name}
                            className={`absolute inset-0 flex items-center justify-center ${
                              size === 'XS'
                                ? themes[name].size.button.activeFont ||
                                  themes[name].size.button.font
                                : themes[name].size.button.font
                            } ${theme === name ? '' : 'pointer-events-none'}`}
                            initial={false}
                            animate={{ opacity: theme === name ? 1 : 0 }}
                          >
                            {size === 'XS' && name === 'Brutalist' ? (
                              <>
                                {/* <span className="absolute w-0.5 bg-teal-400 left-full ml-0.5 top-0 -bottom-1" />
                                <span className="absolute h-0.5 bg-teal-400 top-full mt-0.5 left-0 -right-1" /> */}
                                {size}
                              </>
                            ) : (
                              size
                            )}
                          </motion.span>
                        ))}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
                <motion.div
                  layout
                  className={clsx(
                    'w-full h-px bg-gray-200',
                    theme === 'Brutalist' ? '-mt-px' : 'my-6'
                  )}
                  initial={false}
                  animate={{ opacity: theme === 'Brutalist' ? 0 : 1 }}
                />
                <div
                  className="flex-none w-full grid gap-4 text-center"
                  style={{ gridTemplateColumns: getThemeValue('button.grid') }}
                >
                  <div className={`relative ${getThemeValue('button.primary.class')}`}>
                    <motion.div
                      layout
                      className={clsx(
                        'relative text-sm border-2 cursor-pointer flex items-center justify-center whitespace-nowrap',
                        themes[theme].button.primary.className || themes[theme].button.className
                      )}
                      style={{ height: getThemeValue('button.height') }}
                      initial={false}
                      animate={{
                        backgroundColor: themes[theme].button.primary.backgroundColor,
                        borderColor:
                          themes[theme].button.primary.borderColor ||
                          themes[theme].button.primary.backgroundColor,
                        borderRadius: themes[theme].button.borderRadius,
                      }}
                    >
                      {Object.keys(themes).map((name, i) => (
                        <motion.span
                          key={name}
                          className={clsx(
                            'flex items-center justify-center',
                            themes[name].button.primary.text,
                            theme === name ? '' : 'absolute'
                          )}
                          initial={false}
                          animate={{ opacity: theme === name ? 1 : 0 }}
                        >
                          <motion.span layout>Buy now</motion.span>
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </div>
                <div className={`relative w-full ${getThemeValue('smallprint.container') || ''}`}>
                  {Object.keys(themes).map((name) => (
                    <motion.p
                      layout
                      key={name}
                      className={`inline-flex align-top ${themes[name].smallprint.inner || ''} ${
                        theme === name ? '' : 'absolute bottom-0 left-0'
                      }`}
                      initial={false}
                      animate={{ opacity: theme === name ? 1 : 0 }}
                    >
                      <span>
                        Free shipping on all
                        <span className="hidden sm:inline"> continental US</span> orders.
                      </span>
                    </motion.p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </AnimateSharedLayout>
  )
}
