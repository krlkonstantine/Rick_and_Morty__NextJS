import Image from 'next/image';
import {NextPageWithLayout} from './_app';
import {PageWrapper} from 'components/PageWrapper/PageWrapper';
import {Header} from 'components/Header/Header';
import {getLayout} from "components/Layout/BaseLayout/BaseLayout";

const Home: NextPageWithLayout = () => (
    <PageWrapper>
        <Header/>
        <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
        />
    </PageWrapper>
);
//дали знать хоуму что его метод теперь тот что мы написали
Home.getLayout = getLayout
export default Home;
