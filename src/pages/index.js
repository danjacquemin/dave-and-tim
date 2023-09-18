import * as React from "react";
import tw, { styled } from "twin.macro";

import Layout from "../components/layout";
import Seo from "../components/seo";

const Hello = styled.div`
  margin: 0.5em;
  padding: 0.5em;
  ${tw`border`}
`;

const IndexPage = () => (
  <Layout>
    <Hello>hello</Hello>
  </Layout>
);

export const Head = () => <Seo title="Home" />;
export default IndexPage;
