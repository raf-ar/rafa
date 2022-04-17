import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import { BlogSEO } from '@/components/SEO'
import formatDate from '@/lib/utils/formatDate'
import ScrollTop from '@/components/ScrollTop'
import siteMetadata from '@/data/siteMetadata'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`

export default function PostLayout({
  frontMatter,
  authorDetails,
  next,
  prev,
  availableLocales,
  children,
}) {
  const { slug, fileName, date, title, readingTime } = frontMatter
  const roundedRead = Math.round(readingTime)
  const { t } = useTranslation()
  const { locale } = useRouter()
  const AuthorLayout = () => {
    return (
      <ul className="my-4 flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
        {authorDetails.map((author) => (
          <li className="flex items-center justify-center space-x-2" key={author.name}>
            {author.avatar && (
              <Image
                src={author.avatar}
                width="38px"
                height="38px"
                alt="avatar"
                className="h-10 w-10 rounded-full"
              />
            )}
            <dl className="whitespace-nowrap text-sm font-medium leading-5">
              <dt className="sr-only">{t('common:name')}</dt>
              <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
              <dt className="sr-only">Twitter</dt>
              <dd>
                {author.twitter && (
                  <Link
                    href={author.twitter}
                    className="flex text-xs text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <FaTwitter size={15} className="mr-1" />
                    {author.twitter.replace('https://twitter.com/', '@')}
                  </Link>
                )}
              </dd>
            </dl>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <SectionContainer>
      <BlogSEO
        availableLocales={availableLocales}
        url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`}
        {...frontMatter}
      />
      <ScrollTop />
      <article>
        <div>
          <header>
            <div className="space-y-1 pb-10 text-center">
              <dl>
                <div>
                  <dt className="sr-only">{t('common:pub')}</dt>
                  <dd className="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400 flex justify-center items-center divide-x-2 divide-gray-500 dark:divide-gray-400">
                    <time className="pr-2" dateTime={date}>{formatDate(date, locale)}</time>
                    <span className="pl-2">
                    {roundedRead}{' '}
                    {roundedRead == 1
                      ? `${t('common:minute')}`
                      : `${t('common:minutes')}` + ' ' + `${t('common:read')}`}
                  </span>
                  </dd>
                  
                  <AuthorLayout />
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-transparent pb-8 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-transparent xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">{children}</div>
            </div>
            <div className="pt-6 pb-6 text-sm text-gray-700 hover:underline dark:text-gray-300 ">
              <Link className="flex items-center" href={editUrl(fileName)}>
                <FaGithub size={20} className="mr-3" />
                {t('common:github')}
              </Link>
            </div>
            <footer>
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${next.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
