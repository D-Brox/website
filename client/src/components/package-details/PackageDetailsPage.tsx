import { Container, UseDisclosureProps } from '@chakra-ui/react'
import { FC } from 'react'
import { Helmet } from 'react-helmet'
import PackageInfo from '../../types/package-info'
import HowToInstall from './HowToInstall'
import PackageDependenciesModal from './PackageDependenciesModal'
import PackageDetailsHeader from './PackageDetailsHeader'
import PackageDetailsTable from './PackageDetailsTable'
import PackageRequiredByModal from './PackageRequiredByModal'
import toTitleCase from '../../util/title-case'

type PackageDetailsPageProps = {
    data: PackageInfo
    allDependencies: string[]
    isMobile: boolean
    requiredByModal: UseDisclosureProps
    dependenciesModal: UseDisclosureProps
}

const PackageDetailsPage: FC<PackageDetailsPageProps> = ({
    allDependencies,
    data,
    isMobile,
    dependenciesModal,
    requiredByModal,
}) => (
    <>
        <Helmet>
            <title>{data.name} - Pacstall</title>
            <meta
                name='keywords'
                content={data.name + ',' + data.name.split('-').join(',')}
            />
            <meta name='description' content={data.description} />

            <meta name='twitter:card' content='summary' />
            <meta property='og:title' content={data.name} />
            <meta property='og:type' content='article' />
            <meta property='og:url' content={location.href} />
            <meta property='og:image' content='/public/app.png' />
            <meta property='og:description' content={data.description} />
        </Helmet>
        <Container maxW='60em' mt='10'>
            <PackageDetailsHeader data={data} isMobile={isMobile} />
            <PackageDetailsTable
                data={data}
                dependencyCount={allDependencies.length}
                dependenciesModal={dependenciesModal}
                requiredByModal={requiredByModal}
            />
            <HowToInstall
                name={data.name}
                prettyName={toTitleCase(data)}
                isMobile={isMobile}
            />
        </Container>
        <PackageRequiredByModal name={data.name} {...requiredByModal} />
        <PackageDependenciesModal name={data.name} {...dependenciesModal} />
    </>
)

export default PackageDetailsPage
