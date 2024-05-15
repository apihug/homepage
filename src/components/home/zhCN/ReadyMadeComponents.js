import { IconContainer, Caption, BigText, Paragraph, Link, Widont } from '@/components/home/common'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { GridLockup } from '../../GridLockup'

function AnimatedImage({ animate = false, delay = 0, ...props }) {
  return (
    <motion.img
      initial={false}
      animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay }}
      alt=""
      loading="lazy"
      decoding="async"
      {...props}
    />
  )
}

const w = 1213
const h = 675

const getStyle = (x, y, width) => ({
  top: `${(y / h) * 100}%`,
  left: `${(x / w) * 100}%`,
  width: `${(width / w) * 100}%`,
})

const images = [
  { src: require('@/img/tailwindui/_0.png').default.src, x: 27, y: 24, width: 236 },
  { src: require('@/img/tailwindui/_1.png').default.src, x: 287, y: 0, width: 567 },
  { src: require('@/img/tailwindui/_2.png').default.src, x: 878, y: 47, width: 308 },
  { src: require('@/img/tailwindui/_3.png').default.src, x: 0, y: 289, width: 472 },
  { src: require('@/img/tailwindui/_4.png').default.src, x: 496, y: 289, width: 441 },
  { src: require('@/img/tailwindui/_5.png').default.src, x: 961, y: 289, width: 252 },
]

export function ReadyMadeComponents() {
  const { ref: inViewRef, inView } = useInView({ threshold: 0.5, triggerOnce: true })

  return (
    <section id="ready-made-components">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <BigText>
          <Widont>ApiHug让你走得更快、更远</Widont>
        </BigText>
        <Paragraph>
          利用专业开发工具、直观的设计工具和代码生成，快速开发企业级组件。<br/>
          现代化、轻量级的Java框架最大程度地提升了开发者在一个集成、强大的企业平台上的效能。
        </Paragraph>
        <Link href="/docs/how/001_support_upload_file" color="indigo" darkColor="gray">
          Learn more
        </Link>
      </div>
      <GridLockup
        className="mt-10"
        beams={0}
        overhang="lg"
        leftProps={{
          style: {
            maskImage: 'linear-gradient(to bottom, white, white, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, white, white, transparent)',
          },
        }}
        left={
          <div ref={inViewRef} className="flex justify-center">
            <div className="w-[216%] ml-[28%] flex-none sm:w-[76rem] sm:ml-0">
              <div className="relative" style={{ paddingTop: `${(h / w) * 100}%` }}>
                {images.map(({ src, x, y, width }, index) => (
                  <AnimatedImage
                    key={src}
                    animate={inView}
                    delay={index * 0.2}
                    src={src}
                    className="absolute shadow-xl rounded-lg"
                    style={getStyle(x, y, width)}
                  />
                ))}
              </div>
            </div>
          </div>
        }
      />
    </section>
  )
}
