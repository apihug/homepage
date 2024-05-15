import {
  BigText,
  Paragraph,
  Link,
  Widont,

} from '@/components/home/common'
import { GridLockup } from '@/components/GridLockup'
import { CodeWindow, getClassNameForToken } from '@/components/CodeWindow'
import { Fragment, useEffect, useState } from 'react'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import { useInView } from 'react-intersection-observer'

import { lines as movieProto } from '../../samples/hug2/movie.protobuf?highlight'
import { lines as movieLevelProto } from '../../samples/hug2/level.protobuf?highlight'
import { lines as movieApiProto } from '../../samples/hug2/api.protobuf?highlight'
import { lines as movieStub } from '../../samples/hug2/stub.json.txt?highlight=json'
import { lines as movieVersions } from '../../samples/hug2/version.json.txt?highlight=json'

import { lines as entityProto } from '../../samples/hug2/entity.protobuf?highlight'
import { lines as entityLiquibase } from '../../samples/hug2/liquibase.xml?highlight'


const movies = [
  {
    title: 'Prognosis Negative',
    starRating: '2.66',
    rating: 'PG-13',
    year: '2021',
    genre: 'Comedy',
    runtime: '1h 46m',
    cast: 'Simon Pegg, Zach Galifianakis',
    image: require('@/img/prognosis-negative.jpg').default.src,
  },
  {
    title: 'Rochelle, Rochelle',
    starRating: '3.25',
    rating: 'R',
    year: '2020',
    genre: 'Romance',
    runtime: '1h 56m',
    cast: 'Emilia Clarke',
    image: require('@/img/rochelle-rochelle.jpg').default.src,
  },
  {
    title: 'Death Blow',
    starRating: '4.95',
    rating: 'NC-17',
    year: '2020',
    genre: 'Action',
    runtime: '2h 5m',
    cast: 'Idris Elba, John Cena, Thandiwe Newton',
    image: require('@/img/death-blow.jpg').default.src,
  },
]

const tabs = {
  React: {
    'movie.proto': movieProto,
    'level.proto': movieLevelProto,
    'api.proto': movieApiProto,
    'version': movieVersions,
    'dependency': movieStub,
  }
}

function ComponentLink({ onClick, children }) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    function onKey(e) {
      const modifier = e.ctrlKey || e.shiftKey || e.altKey || e.metaKey
      if (!active && modifier) {
        setActive(true)
      } else if (active && !modifier) {
        setActive(false)
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('keyup', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('keyup', onKey)
    }
  }, [active])

  return active ? (
    <button type="button" className="hover:underline" onClick={onClick}>
      {children}
    </button>
  ) : (
    children
  )
}

function ComponentExample({ framework }) {
  const [activeTab, setActiveTab] = useState(0)
  const lines = tabs[framework][Object.keys(tabs[framework])[activeTab]]

  useIsomorphicLayoutEffect(() => {
    setActiveTab(0)
  }, [framework])

  return (
    <CodeWindow border={false}>
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          key={framework}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex-none overflow-auto whitespace-nowrap flex"
        >
          <div className="relative flex-none min-w-full px-1">
            <ul className="flex text-sm leading-6 text-slate-400">
              {Object.keys(tabs[framework]).map((tab, tabIndex) => (
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
          key={framework + activeTab}
          className="w-full flex-auto flex min-h-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CodeWindow.Code2 lines={lines.length}>
            {lines.map((tokens, lineIndex) => (
              <Fragment key={framework + activeTab + lineIndex}>
                {tokens.map((token, tokenIndex) => {
                  if (
                    token.types[token.types.length - 1] === 'string' &&
                    /^"[^"]+\.proto"$/.test(token.content)
                  ) {
                    //"level.proto"
                    const tab = token.content.substring(1, token.content.length - 1)
                    return (
                      <span key={tokenIndex} className={getClassNameForToken(token)}>
                        {token.content.substring(0, 1)}
                        <button
                          type="button"
                          className="underline"
                          onClick={() => setActiveTab(Object.keys(tabs[framework]).indexOf(tab))}
                        >
                          ./{tab}
                        </button>
                        {token.content.substring(0, 1)}
                      </span>
                    )
                  }

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

function ApplyExample({ inView }) {
  return (
    <CodeWindow className="!h-auto !max-h-[none]" border={false}>
      <h3 className="pl-4 flex text-sm leading-6 text-sky-300 border-b border-slate-500/30">
        <span className="-mb-px py-2 border-b border-b-current">entity.proto</span>
      </h3>
      <div className="flex-none">
        <CodeWindow.Code2 lines={entityProto.length}>
          {entityProto.map((tokens, lineIndex) => (
            <Fragment key={lineIndex}>
              {tokens.map((token, tokenIndex) => {
                let className = getClassNameForToken(token)
                return (
                  <span key={tokenIndex} className={className}>
                    {token.content}
                  </span>
                )
              })}
              {'\n'}
            </Fragment>
          ))}
        </CodeWindow.Code2>
      </div>
      <h3 className="pl-4 flex text-sm leading-6 text-sky-300 border-b border-slate-500/30">
        <span className="-mb-px py-2 border-b border-b-current">liquibase.xml</span>
      </h3>
      <div className="overflow-hidden">
        <CodeWindow.Code2 lines={entityLiquibase.length} initialLineNumber={31} overflow="x" className="-mt-6">
          <div className={clsx('mono', { 'mono-active': inView })}>
            {entityLiquibase.map((tokens, lineIndex) => (
              <div
                key={lineIndex}
                className={lineIndex >= 4 && lineIndex <= 5 ? 'not-mono' : undefined}
              >
                {tokens.map((token, tokenIndex) => {
                  return (
                    <span
                      key={tokenIndex}
                      className={clsx(getClassNameForToken(token), 'delay-500')}
                      style={{ transitionDuration: '1.5s' }}
                    >
                      {token.content}
                    </span>
                  )
                })}
              </div>
            ))}
          </div>
        </CodeWindow.Code2>
      </div>
    </CodeWindow>
  )
}

function AtApplySection() {
  let { inView, ref } = useInView({ threshold: 0.5, triggerOnce: true })
  let fade = ['transition-opacity duration-[1.5s] delay-500', { 'opacity-25': inView }]

  return (
    <div className="mt-20 relative max-w-7xl mx-auto px-4 sm:mt-32 sm:px-6 md:px-8 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:grid-rows-1">
      <div className="lg:col-span-7 xl:col-span-6 lg:row-end-1">
        <h3 className="text-3xl text-slate-900 font-extrabold dark:text-slate-200">
          Database Design
        </h3>
        <Paragraph>
          Intuitive Design + Efficient Code Generation = Elegant Database Design;<br/>
          Comprehensive Coverage from API to Data Access.
        </Paragraph>
        <Link href="/docs/framework/spring-data" color="sky" darkColor="gray">
          Learn more<span className="sr-only">, data model</span>
        </Link>
      </div>

      <div className="pt-10 lg:col-span-5 xl:col-span-6 lg:row-start-1 lg:row-end-2">
        <div
          ref={ref}
          className="relative z-10 bg-white rounded-xl shadow-xl ring-1 ring-slate-900/5  dark:bg-slate-800 dark:highlight-white/10"
        >
          <article>
            <h2
              className={clsx(
                'text-lg font-bold text-slate-900 pt-4 pb-2 px-4 sm:px-6 lg:px-4 xl:px-6 dark:text-slate-100'
              )}
            >
              Movie Entity
            </h2>
            <dl
              className="flex flex-wrap divide-y divide-slate-200 border-b border-slate-200 text-sm sm:text-base lg:text-sm xl:text-base dark:divide-slate-200/5 dark:border-slate-200/5">
              <div className="w-full flex-none flex items-center p-4 sm:p-6 lg:p-4 xl:p-6">
                <dt
                  className={clsx(
                    'w-2/5 sm:w-1/4 flex-none text-slate-900 font-bold  dark:text-slate-300'
                  )}
                >
                  Column
                </dt>
                <dd className={clsx('text-slate-900  font-bold  dark:text-slate-300')}>
                  Type
                </dd>
              </div>
              <div className="w-full flex-none flex items-center p-4 sm:p-6 lg:p-4 xl:p-6">
                <dt
                  className={clsx(
                    'w-2/5 sm:w-1/4 flex-none text-slate-900 font-medium dark:text-slate-300',
                    ...fade
                  )}
                >
                  Id
                </dt>
                <dd className={clsx(...fade)}>
                  <abbr>BIGINT</abbr>
                </dd>
              </div>
              <div className="w-full flex-none flex items-center p-4 sm:p-6 lg:p-4 xl:p-6">
                <dt
                  className={clsx(
                    'w-2/5 sm:w-1/4 flex-none text-slate-900 font-medium dark:text-slate-300',
                    ...fade
                  )}
                >
                  Name
                </dt>
                <dd className={clsx(...fade)}>
                  <abbr>VARCHAR(64)</abbr>
                </dd>
              </div>
              <div className="w-full flex-none flex items-center p-4 sm:p-6 lg:p-4 xl:p-6">
                <dt
                  className={clsx(
                    'w-2/5 sm:w-1/4 flex-none text-slate-900 font-medium dark:text-slate-300',
                    ...fade
                  )}
                >
                  Description
                </dt>
                <dd className={clsx(...fade)}>VARCHAR(255)</dd>
              </div>
              <div className="w-full flex-none flex items-center p-4 sm:py-5 sm:px-6 lg:p-4 xl:py-5 xl:px-6">
                <dt
                  className={clsx(
                    'w-2/5 sm:w-1/4 flex-none text-slate-900 font-medium dark:text-slate-300',
                    ...fade
                  )}
                >
                  Level
                </dt>
                <dd
                  className={clsx(
                    ...fade
                  )}
                >
                  VARCHAR(16)
                </dd>
              </div>

              <div className="w-full flex-none flex items-center p-4 sm:py-5 sm:px-6 lg:p-4 xl:py-5 xl:px-6">
                <dt
                  className={clsx(
                    'w-2/5 sm:w-1/4 flex-none text-slate-900 font-medium dark:text-slate-300',
                    ...fade
                  )}
                >
                  Year
                </dt>
                <dd
                  className={clsx(
                    ...fade
                  )}
                >
                  INT
                </dd>
              </div>

              <div className="w-full flex-none flex items-center p-4 sm:py-5 sm:px-6 lg:p-4 xl:py-5 xl:px-6">
                <dt
                  className={clsx(
                    'w-2/5 sm:w-1/4 flex-none text-slate-900 font-medium dark:text-slate-300',
                    ...fade
                  )}
                >
                  Type
                </dt>
                <dd
                  className={clsx(
                    ...fade
                  )}
                >
                  VARCHAR(32)
                </dd>
              </div>
              <div className="w-full flex-none flex items-center p-4 sm:py-5 sm:px-6 lg:p-4 xl:py-5 xl:px-6">
                <dt
                  className={clsx(
                    'w-2/5 sm:w-1/4 flex-none text-slate-900 font-medium dark:text-slate-300',
                    ...fade
                  )}
                >
                  Created
                </dt>
                <dd
                  className={clsx(
                    ...fade
                  )}
                >
                  DATETIME
                </dd>
              </div>
              <div className="w-full flex-none flex items-center p-4 sm:py-5 sm:px-6 lg:p-4 xl:py-5 xl:px-6">
                <dt
                  className={clsx(
                    'w-2/5 sm:w-1/4 flex-none text-slate-900 font-medium dark:text-slate-300',
                    ...fade
                  )}
                >
                  Updated
                </dt>
                <dd
                  className={clsx(
                    ...fade
                  )}
                >
                  DATETIME
                </dd>
              </div>
            </dl>
          </article>
        </div>
      </div>
      <div className="mt-4 -mx-4 sm:mx-0 lg:mt-0 lg:col-span-7 lg:row-end-2 xl:mt-18 xl:col-span-6 xl:row-span-2">
        <ApplyExample inView={inView}/>
      </div>
    </div>
  )
}

export function ComponentDriven() {
  const [framework, setFramework] = useState('React')

  return (
    <section id="component-driven">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <BigText>
          <Widont>Efficient Development.</Widont>
        </BigText>
        <Paragraph>
          Module Sharing, Version Control, API Repository.<br/>
          Standard API Design Meta Language, Specification-driven, Single Source of Truth, Unified IDE for More Efficient Collaboration.
        </Paragraph>
        <Link href="/docs/framework/spring-common" color="sky" darkColor="gray">
          Learn more<span className="sr-only">, reusing components</span>
        </Link>
      </div>
      <GridLockup.Container className="mt-10 xl:mt-2" beams={8}>
        <GridLockup.Grid
          left={
            <div className="relative z-10 bg-white rounded-xl shadow-xl ring-1 ring-slate-900/5 divide-y divide-slate-100 my-auto xl:mt-18 dark:bg-slate-800 dark:divide-slate-200/5 dark:highlight-white/10">
              <nav className="py-4 px-4 sm:px-6 lg:px-4 xl:px-6 text-sm font-medium">
                <ul className="flex space-x-3">
                  <li>
                    <div className="px-3 py-2 rounded-md bg-slate-50 cursor-pointer dark:bg-transparent dark:text-slate-300 dark:ring-1 dark:ring-slate-700">
                      {'<'}
                    </div>
                  </li>
                  <li>
                    <div className="px-3 py-2 rounded-md bg-sky-500 text-white cursor-pointer">
                      1
                    </div>
                  </li>
                  <li>
                    <div className="px-3 py-2 rounded-md bg-slate-50 cursor-pointer dark:bg-transparent dark:text-slate-300 dark:ring-1 dark:ring-slate-700">
                      2
                    </div>
                  </li>
                  <li>
                    <div className="px-3 py-2 rounded-md bg-slate-50 cursor-pointer dark:bg-transparent dark:text-slate-300 dark:ring-1 dark:ring-slate-700">
                      3
                    </div>
                  </li>
                  <li>
                    <div className="px-3 py-2 rounded-md bg-slate-50 cursor-pointer dark:bg-transparent dark:text-slate-300 dark:ring-1 dark:ring-slate-700">
                      {'>'}
                    </div>
                  </li>
                </ul>
              </nav>
              {movies.map(({ title, starRating, rating, year, genre, runtime, cast, image }, i) => (
                <article
                  key={title}
                  className={clsx(
                    'p-4 sm:p-6 lg:p-4 xl:p-6 space-x-4 items-start sm:space-x-6 lg:space-x-4 xl:space-x-6',
                    i < 2 ? 'flex' : 'hidden sm:flex'
                  )}
                >
                  <img
                    src={image}
                    loading="lazy"
                    decoding="async"
                    alt=""
                    width="60"
                    height="88"
                    className="flex-none rounded-md bg-slate-100"
                  />
                  <div className="min-w-0 relative flex-auto">
                    <h2 className="font-semibold text-slate-900 truncate sm:pr-20 dark:text-slate-100">
                      {title}
                    </h2>
                    <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                      <div className="hidden absolute top-0 right-0 sm:flex items-center space-x-1 dark:text-slate-100">
                        <dt className="text-sky-500">
                          <span className="sr-only">Star rating</span>
                          <svg width="16" height="20" fill="currentColor">
                            <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
                          </svg>
                        </dt>
                        <dd>{starRating}</dd>
                      </div>
                      <div className="dark:text-slate-200">
                        <dt className="sr-only">Rating</dt>
                        <dd className="px-1.5 ring-1 ring-slate-200 rounded dark:ring-slate-600">
                          {rating}
                        </dd>
                      </div>
                      <div className="ml-2">
                        <dt className="sr-only">Year</dt>
                        <dd>{year}</dd>
                      </div>
                      <div>
                        <dt className="sr-only">Genre</dt>
                        <dd className="flex items-center">
                          <svg
                            width="2"
                            height="2"
                            fill="currentColor"
                            className="mx-2 text-slate-300"
                            aria-hidden="true"
                          >
                            <circle cx="1" cy="1" r="1" />
                          </svg>
                          {genre}
                        </dd>
                      </div>
                      <div>
                        <dt className="sr-only">Runtime</dt>
                        <dd className="flex items-center">
                          <svg
                            width="2"
                            height="2"
                            fill="currentColor"
                            className="mx-2 text-slate-300"
                            aria-hidden="true"
                          >
                            <circle cx="1" cy="1" r="1" />
                          </svg>
                          {runtime}
                        </dd>
                      </div>
                      <div className="flex-none w-full mt-2 font-normal">
                        <dt className="sr-only">Cast</dt>
                        <dd className="text-slate-400">{cast}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          }
          right={<ComponentExample framework={framework} />}
        />
        <AtApplySection />
      </GridLockup.Container>
    </section>
  )
}
