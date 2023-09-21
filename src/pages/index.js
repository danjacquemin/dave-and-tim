import * as React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import SwagSong from "../components/swag-song";

const IndexPage = () => (
  <Layout>
    <SwagSong></SwagSong>
  </Layout>
);

export const Head = () => <Seo title="Home" />;
export default IndexPage;
