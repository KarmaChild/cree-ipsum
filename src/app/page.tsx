import Head from 'next/head';
import LoremIpsumGenerator from '../components/LoremIpsumGenerator';

export default function Home() {
  return (
      <div>
        <Head>
          <title>Cree Lorem Ipsum Generator</title>
          <meta name="description" content="Generate Cree Lorem Ipsum text" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1>Lorem Ipsum Generator</h1>
          <LoremIpsumGenerator />
        </main>

        <footer>
          {/* Footer content */}
        </footer>
      </div>
  );
}
