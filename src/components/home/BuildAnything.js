import { Fragment, useEffect, useRef, useState } from 'react'
import { CodeWindow, getClassNameForToken } from '@/components/CodeWindow'
import { HtmlZenGarden } from '@/components/HtmlZenGarden'
import clsx from 'clsx'
import { GridLockup } from '../GridLockup'

import { lines as apiProto } from '../../samples/hug/api.protobuf?highlight'
import { lines as apiJava } from '../../samples/hug/api.java?highlight'
import { lines as apiJson } from '../../samples/hug/api.txt?highlight=json'
import {AnimatePresence, motion} from "framer-motion";

const  HERO_SAMPLE_CODE_TABS ={
  'api.proto': apiProto,
  'Service.java': apiJava,
  'swagger.json': apiJson,
}

function HeroComponentExample() {
  const [activeTab, setActiveTab] = useState(0)
  const lines = HERO_SAMPLE_CODE_TABS[Object.keys(HERO_SAMPLE_CODE_TABS)[activeTab]]
  return (
    <CodeWindow border={false}>
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex-none overflow-auto whitespace-nowrap flex"
        >
          <div className="relative flex-none min-w-full px-1">
            <ul className="flex text-sm leading-6 text-slate-400">
              {Object.keys(HERO_SAMPLE_CODE_TABS).map((tab, tabIndex) => (
                <li key={tab} className="flex-none">
                  <button
                    type="button"
                    className={clsx(
                      'relative py-2 px-3',
                      tabIndex === activeTab ? 'text-sky-300' : 'hover:text-slate-300'
                    )}
                    onClick={() => setActiveTab(tabIndex)}
                  >
                    {tab}
                    {tabIndex === activeTab && (
                      <span className="absolute z-10 bottom-0 inset-x-3 h-px bg-sky-300" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
            <div className="absolute bottom-0 inset-x-0 h-px bg-slate-500/30" />
          </div>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          className="w-full flex-auto flex min-h-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CodeWindow.Code2 lines={lines.length}>
            {lines.map((tokens, lineIndex) => (
              <Fragment key={activeTab + lineIndex}>
                {tokens.map((token, tokenIndex) => {
                  return (
                    <span key={tokenIndex} className={getClassNameForToken(token)}>
                      {token.content}
                    </span>
                  )
                })}
                {'\n'}
              </Fragment>
            ))}
          </CodeWindow.Code2>
        </motion.div>
      </AnimatePresence>
    </CodeWindow>
  )
}

export function BuildAnything() {
  const [theme, setTheme] = useState('Simple')
  const initial = useRef(true)

  useEffect(() => {
    initial.current = false
  }, [])

  return (
    <section id="build-anything" className="mt-20 sm:mt-24 lg:mt-32">
      <GridLockup
        className="mt-20 xl:mt-2"
        beams={1}
        left={<HtmlZenGarden theme={theme} />}
        right={ <HeroComponentExample/>}
      />
    </section>
  )
}
