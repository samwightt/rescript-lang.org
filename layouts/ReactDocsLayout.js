// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Url from "../common/Url.js";
import * as React from "react";
import * as Markdown from "../components/Markdown.js";
import * as Belt_List from "bs-platform/lib/es6/belt_List.js";
import * as DocsLayout from "./DocsLayout.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Router from "next/router";

var overviewNavs = [{
    name: "Introduction",
    href: "/docs/react/latest/introduction"
  }];

var tocData = (require('../index_data/react_latest_toc.json'));

var CategoryDocsLayout = DocsLayout.Make({
      tocData: tocData
    });

function ReactDocsLayout(Props) {
  var frontmatter = Props.frontmatter;
  var componentsOpt = Props.components;
  var children = Props.children;
  var components = componentsOpt !== undefined ? Caml_option.valFromOption(componentsOpt) : Markdown.$$default;
  var router = Router.useRouter();
  var route = router.route;
  var url = Url.parse(route);
  var version = url.version;
  var version$1 = typeof version === "number" ? "latest" : version._0;
  var prefix_0 = {
    name: "Docs",
    href: "/docs/latest"
  };
  var prefix_1 = {
    hd: {
      name: "ReasonReact",
      href: "/docs/react/" + (version$1 + "/introduction")
    },
    tl: /* [] */0
  };
  var prefix = {
    hd: prefix_0,
    tl: prefix_1
  };
  var breadcrumbs = Belt_List.concat(prefix, DocsLayout.makeBreadcrumbs("/docs/gentype/" + version$1, route));
  var availableVersions = ["latest"];
  var tmp = {
    breadcrumbs: breadcrumbs,
    title: "ReasonReact",
    metaTitleCategory: "React",
    version: "latest",
    availableVersions: availableVersions,
    latestVersionLabel: "v0.9",
    components: components,
    theme: "Reason",
    children: children
  };
  if (frontmatter !== undefined) {
    tmp.frontmatter = Caml_option.valFromOption(frontmatter);
  }
  return React.createElement(CategoryDocsLayout.make, tmp);
}

var Link;

var NavItem;

var Category;

var Toc;

var make = ReactDocsLayout;

export {
  Link ,
  NavItem ,
  Category ,
  Toc ,
  overviewNavs ,
  CategoryDocsLayout ,
  make ,
  
}
/* CategoryDocsLayout Not a pure module */