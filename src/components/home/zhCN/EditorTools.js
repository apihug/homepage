import { BigText, Paragraph, Link } from '@/components/home/common'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { GridLockup } from '../../GridLockup'
import clsx from 'clsx'

function Block({ src, filter, ...props }) {
  return (
    <motion.div initial={false} {...props}>
      <div
        className={clsx(
          'relative bg-white rounded-lg shadow-lg overflow-hidden transition-[filter] duration-500',
          filter
        )}
      >
        <img
          src={src}
          alt=""
          decoding="async"
          loading="lazy"
        />
      </div>
    </motion.div>
  )
}

export function EditorTools() {

  const [feature] = useState('CSS Grid')

  const animate = (transforms, grid) => {
    if (feature === 'Transforms') {
      return {
        animate: transforms,
      }
    }
    return {
      animate: grid,
    }
  }

  return (
    <section id="editor-tools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <BigText>IDEA 完整语言支持</BigText>
        <Paragraph as="div">
          <p>
            智能的自动补全建议、代码检查和语法高亮显示；
            <br/>所有这些都在您最爱的编辑器插件: The ApiHug - API design <code className="font-mono font-medium text-sky-500 dark:text-sky-400">Copilot</code> {' '}.
          </p>
        </Paragraph>
        <Link href="/docs/idea" color="sky" darkColor="gray">
          了解更多<span className="sr-only">, 插件</span>
        </Link>
      </div>
      <GridLockup
        className="mt-10"
        beams={7}
        left={
          <div className="relative">
            <img
              decoding="async"
              src={require('@/img/beams/overlay.webp').default.src}
              alt=""
              className="absolute z-10 bottom-0 -left-80 w-[45.0625rem] pointer-events-none dark:hidden"
            />
            <Block
              src={require('@/img/hug/001_smart_editor.gif').default.src}
              filter={feature === 'Filters' && 'blur'}
              {...animate(
                { scaleX: 1.1, scaleY: 1.1, rotate: -6, x: 0, y: 0 },
                { scaleX: 1, scaleY: 1, rotate: 0, x: 0, y: 0 }
              )}
            />
          </div>
        }
      />
    </section>
  )
}
