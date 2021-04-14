// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Fs from "fs";
import * as Mdx from "./common/Mdx.js";
import * as Icon from "./components/Icon.js";
import * as Meta from "./components/Meta.js";
import * as Next from "./bindings/Next.js";
import * as Path from "path";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Footer from "./components/Footer.js";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Js_null from "bs-platform/lib/es6/js_null.js";
import FuseJs from "fuse.js";
import * as Process from "process";
import * as Markdown from "./components/Markdown.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Navigation from "./components/Navigation.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";

function Packages$SearchBox(Props) {
  var completionValuesOpt = Props.completionValues;
  var value = Props.value;
  var onClear = Props.onClear;
  var placeholderOpt = Props.placeholder;
  var onValueChange = Props.onValueChange;
  var completionValues = completionValuesOpt !== undefined ? completionValuesOpt : [];
  var placeholder = placeholderOpt !== undefined ? placeholderOpt : "";
  var match = React.useState(function () {
        return /* Inactive */1;
      });
  var setState = match[1];
  var state = match[0];
  var textInput = React.useRef(null);
  var onMouseDownClear = function (evt) {
    evt.preventDefault();
    return Curry._1(onClear, undefined);
  };
  var onAreaFocus = function (evt) {
    var el = evt.target;
    var isDiv = (el.type == null);
    if (isDiv && state === /* Inactive */1) {
      return Belt_Option.forEach(Caml_option.nullable_to_opt(textInput.current), (function (el) {
                    el.focus();
                    
                  }));
    }
    
  };
  var onFocus = function (param) {
    return Curry._1(setState, (function (param) {
                  return /* Active */0;
                }));
  };
  var onBlur = function (param) {
    return Curry._1(setState, (function (param) {
                  return /* Inactive */1;
                }));
  };
  var onKeyDown = function (evt) {
    var key = evt.key;
    var ctrlKey = evt.ctrlKey;
    var full = (
      ctrlKey ? "CTRL+" : ""
    ) + key;
    switch (full) {
      case "Escape" :
          return Curry._1(onClear, undefined);
      case "Tab" :
          if (completionValues.length !== 1) {
            return ;
          }
          var targetValue = Belt_Array.getExn(completionValues, 0);
          if (targetValue !== value) {
            evt.preventDefault();
            return Curry._1(onValueChange, targetValue);
          } else {
            return ;
          }
      default:
        return ;
    }
  };
  var onChange = function (evt) {
    evt.preventDefault();
    return Curry._1(onValueChange, evt.target.value);
  };
  return React.createElement("div", {
              className: " flex bg-white items-center rounded-lg py-4 px-5",
              tabIndex: -1,
              onFocus: onAreaFocus,
              onBlur: onBlur
            }, React.createElement(Icon.MagnifierGlass.make, {
                  className: (
                    state === /* Active */0 ? "text-gray-100" : "text-gray-60"
                  ) + " w-5 h-5"
                }), React.createElement("input", {
                  ref: textInput,
                  className: "text-16 font-medium text-gray-95 outline-none ml-4 w-full",
                  placeholder: placeholder,
                  type: "text",
                  value: value,
                  onKeyDown: onKeyDown,
                  onFocus: onFocus,
                  onChange: onChange
                }), React.createElement("button", {
                  className: value === "" ? "hidden" : "block",
                  onFocus: onFocus,
                  onMouseDown: onMouseDownClear
                }, React.createElement(Icon.Close.make, {
                      className: "w-4 h-4 text-gray-60 hover:text-gray-100"
                    })));
}

function shouldFilter(res) {
  if (res.TAG === /* Npm */0 && res._0.name.startsWith("@elm-react")) {
    return true;
  } else {
    return false;
  }
}

function filterKeywords(keywords) {
  return Belt_Array.keep(keywords, (function (kw) {
                var match = kw.toLowerCase();
                switch (match) {
                  case "bucklescript" :
                  case "ocaml" :
                  case "reason" :
                  case "reasonml" :
                  case "rescript" :
                      return false;
                  default:
                    return true;
                }
              }));
}

function isOfficial(res) {
  if (res.TAG !== /* Npm */0) {
    return res._0.official;
  }
  var pkg = res._0;
  if (pkg.name === "bs-platform") {
    return true;
  } else {
    return pkg.name.startsWith("@rescript/");
  }
}

function applyNpmSearch(packages, pattern) {
  var fuseOpts = {
    shouldSort: true,
    includeScore: true,
    threshold: 0.2,
    location: 0,
    distance: 30,
    minMatchCharLength: 1,
    keys: [
      "meta.uid",
      "name",
      "keywords"
    ]
  };
  var fuser = new FuseJs(packages, fuseOpts);
  return fuser.search(pattern);
}

function applyUrlResourceSearch(urls, pattern) {
  var fuseOpts = {
    shouldSort: true,
    includeScore: true,
    threshold: 0.2,
    location: 0,
    distance: 30,
    minMatchCharLength: 1,
    keys: [
      "name",
      "keywords"
    ]
  };
  var fuser = new FuseJs(urls, fuseOpts);
  return fuser.search(pattern);
}

function applySearch(resources, pattern) {
  var match = Belt_Array.reduce(resources, [
        [],
        []
      ], (function (acc, next) {
          var resources = acc[1];
          var npms = acc[0];
          if (next.TAG === /* Npm */0) {
            npms.push(next._0);
          } else {
            resources.push(next._0);
          }
          return [
                  npms,
                  resources
                ];
        }));
  var filteredNpm = Belt_Array.map(applyNpmSearch(match[0], pattern), (function (m) {
          return {
                  TAG: 0,
                  _0: m.item,
                  [Symbol.for("name")]: "Npm"
                };
        }));
  var filteredUrls = Belt_Array.map(applyUrlResourceSearch(match[1], pattern), (function (m) {
          return {
                  TAG: 1,
                  _0: m.item,
                  [Symbol.for("name")]: "Url"
                };
        }));
  return Belt_Array.concat(filteredNpm, filteredUrls);
}

function Packages$Card(Props) {
  var value = Props.value;
  var onKeywordSelect = Props.onKeywordSelect;
  var icon;
  icon = value.TAG === /* Npm */0 ? React.createElement(Icon.Npm.make, {
          className: "w-8 opacity-50"
        }) : React.createElement("span", undefined, React.createElement(Icon.Hyperlink.make, {
              className: "w-8 opacity-50"
            }));
  var linkBox;
  if (value.TAG === /* Npm */0) {
    var pkg = value._0;
    var repositoryHref = pkg.repositoryHref;
    var repoEl;
    if (repositoryHref !== null) {
      var name = repositoryHref.startsWith("https://github.com") ? "Github" : (
          repositoryHref.startsWith("https://gitlab.com") ? "Gitlab" : "Repository"
        );
      repoEl = React.createElement(React.Fragment, undefined, React.createElement("span", undefined, "|"), React.createElement("a", {
                className: "hover:text-fire",
                href: repositoryHref,
                rel: "noopener noreferrer",
                target: "_blank"
              }, name));
    } else {
      repoEl = null;
    }
    linkBox = React.createElement("div", {
          className: "text-12 text-gray-40 space-x-2 mt-1"
        }, React.createElement("a", {
              className: "hover:text-fire",
              href: pkg.npmHref,
              target: "_blank"
            }, "NPM"), repoEl);
  } else {
    linkBox = null;
  }
  var titleHref;
  if (value.TAG === /* Npm */0) {
    var pkg$1 = value._0;
    titleHref = Belt_Option.getWithDefault(Caml_option.null_to_opt(pkg$1.repositoryHref), pkg$1.npmHref);
  } else {
    titleHref = value._0.urlHref;
  }
  var match;
  if (value.TAG === /* Npm */0) {
    var match$1 = value._0;
    match = [
      match$1.name,
      match$1.description,
      match$1.keywords
    ];
  } else {
    var match$2 = value._0;
    match = [
      match$2.name,
      match$2.description,
      match$2.keywords
    ];
  }
  var versionEl;
  versionEl = value.TAG === /* Npm */0 ? React.createElement("span", {
          className: "text-12 text-gray-40 font-medium"
        }, value._0.version) : null;
  return React.createElement("div", {
              className: "bg-white py-6 shadow-xs rounded-lg p-4"
            }, React.createElement("div", {
                  className: "flex justify-between"
                }, React.createElement("div", undefined, React.createElement("div", {
                          className: "space-x-2"
                        }, React.createElement("a", {
                              className: "font-bold hover:text-fire font-semibold text-18",
                              href: titleHref,
                              target: "_blank"
                            }, React.createElement("span", undefined, match[0])), versionEl), linkBox), React.createElement("div", {
                      className: "text-gray-90"
                    }, icon)), React.createElement("div", {
                  className: "mt-4 text-14"
                }, match[1]), React.createElement("div", {
                  className: "space-x-2 mt-4"
                }, Belt_Array.map(match[2], (function (keyword) {
                        var onMouseDown = Belt_Option.map(onKeywordSelect, (function (cb, evt) {
                                evt.preventDefault();
                                return Curry._1(cb, keyword);
                              }));
                        var tmp = {
                          key: keyword,
                          className: "hover:pointer border border-fire-40 hover:border-gray-100 px-2 rounded text-gray-60-tr hover:text-gray-95 bg-fire-40 text-12"
                        };
                        if (onMouseDown !== undefined) {
                          tmp.onMouseDown = Caml_option.valFromOption(onMouseDown);
                        }
                        return React.createElement("button", tmp, keyword);
                      }))));
}

function Packages$InfoSidebar$Toggle(Props) {
  var enabled = Props.enabled;
  var toggle = Props.toggle;
  var children = Props.children;
  var className = "block px-4 rounded-lg " + (
    enabled ? "bg-fire text-white" : " bg-gray-10"
  );
  var onMouseDown = function (evt) {
    evt.preventDefault();
    return Curry._1(toggle, undefined);
  };
  return React.createElement("button", {
              className: className,
              onMouseDown: onMouseDown
            }, children);
}

function Packages$InfoSidebar(Props) {
  var setFilter = Props.setFilter;
  var filter = Props.filter;
  var h2 = "group mb-3 text-14 uppercase  leading-1 font-sans font-medium text-gray-95";
  return React.createElement("aside", {
              className: " border-l-2 p-4 py-12 border-fire-30 space-y-16"
            }, React.createElement("div", undefined, React.createElement("h2", {
                      className: h2
                    }, "Filter for"), React.createElement("div", {
                      className: "space-y-2"
                    }, React.createElement(Packages$InfoSidebar$Toggle, {
                          enabled: filter.includeOfficial,
                          toggle: (function (param) {
                              return Curry._1(setFilter, (function (prev) {
                                            return {
                                                    searchterm: prev.searchterm,
                                                    includeOfficial: !filter.includeOfficial,
                                                    includeCommunity: prev.includeCommunity,
                                                    includeNpm: prev.includeNpm,
                                                    includeUrlResource: prev.includeUrlResource
                                                  };
                                          }));
                            }),
                          children: "Official"
                        }), React.createElement(Packages$InfoSidebar$Toggle, {
                          enabled: filter.includeCommunity,
                          toggle: (function (param) {
                              return Curry._1(setFilter, (function (prev) {
                                            return {
                                                    searchterm: prev.searchterm,
                                                    includeOfficial: prev.includeOfficial,
                                                    includeCommunity: !filter.includeCommunity,
                                                    includeNpm: prev.includeNpm,
                                                    includeUrlResource: prev.includeUrlResource
                                                  };
                                          }));
                            }),
                          children: "Community"
                        }), React.createElement(Packages$InfoSidebar$Toggle, {
                          enabled: filter.includeNpm,
                          toggle: (function (param) {
                              return Curry._1(setFilter, (function (prev) {
                                            return {
                                                    searchterm: prev.searchterm,
                                                    includeOfficial: prev.includeOfficial,
                                                    includeCommunity: prev.includeCommunity,
                                                    includeNpm: !filter.includeNpm,
                                                    includeUrlResource: prev.includeUrlResource
                                                  };
                                          }));
                            }),
                          children: "NPM package"
                        }), React.createElement(Packages$InfoSidebar$Toggle, {
                          enabled: filter.includeUrlResource,
                          toggle: (function (param) {
                              return Curry._1(setFilter, (function (prev) {
                                            return {
                                                    searchterm: prev.searchterm,
                                                    includeOfficial: prev.includeOfficial,
                                                    includeCommunity: prev.includeCommunity,
                                                    includeNpm: prev.includeNpm,
                                                    includeUrlResource: !filter.includeUrlResource
                                                  };
                                          }));
                            }),
                          children: "URL resources"
                        }))), React.createElement("div", undefined, React.createElement("h2", {
                      className: h2
                    }, "Guidelines"), React.createElement("ul", {
                      className: "space-y-4"
                    }, React.createElement(Next.Link.make, {
                          href: "/docs/guidelines/publishing-packages",
                          children: React.createElement("a", {
                                className: "hover:underline"
                              }, "Publishing ReScript npm packages")
                        }))));
}

var scrollToTop = (function() {
  window.scroll({
    top: 0, 
    left: 0, 
    behavior: 'smooth'
  });
});

function $$default(props) {
  var match = React.useState(function () {
        return /* All */0;
      });
  var setState = match[1];
  var state = match[0];
  var match$1 = React.useState(function () {
        return /* Official */0;
      });
  var selectedCategory = match$1[0];
  var match$2 = React.useState(function () {
        return {
                searchterm: "",
                includeOfficial: true,
                includeCommunity: true,
                includeNpm: true,
                includeUrlResource: true
              };
      });
  var filter = match$2[0];
  var npms = Belt_Array.map(props.packages, (function (pkg) {
          return {
                  TAG: 0,
                  _0: pkg,
                  [Symbol.for("name")]: "Npm"
                };
        }));
  var urls = Belt_Array.map(props.urlResources, (function (res) {
          return {
                  TAG: 1,
                  _0: res,
                  [Symbol.for("name")]: "Url"
                };
        }));
  var allResources = Belt_Array.concat(npms, urls);
  var resources = state ? applySearch(allResources, state._0) : allResources;
  var onValueChange = function (value) {
    return Curry._1(setState, (function (param) {
                  if (value === "") {
                    return /* All */0;
                  } else {
                    return {
                            _0: value,
                            [Symbol.for("name")]: "Filtered"
                          };
                  }
                }));
  };
  var searchValue = state ? state._0 : "";
  var onClear = function (param) {
    return Curry._1(setState, (function (param) {
                  return /* All */0;
                }));
  };
  var match$3 = Belt_Array.reduce(resources, [
        [],
        []
      ], (function (acc, next) {
          var community = acc[1];
          var official = acc[0];
          var isResourceIncluded;
          isResourceIncluded = next.TAG === /* Npm */0 ? filter.includeNpm : filter.includeUrlResource;
          if (isResourceIncluded) {
            if (filter.includeOfficial && isOfficial(next)) {
              official.push(next);
            } else if (filter.includeCommunity && !shouldFilter(next)) {
              community.push(next);
            }
            
          }
          return [
                  official,
                  community
                ];
        }));
  var communityResources = match$3[1];
  var officialResources = match$3[0];
  var onKeywordSelect = function (keyword) {
    Curry._1(scrollToTop, undefined);
    return Curry._1(setState, (function (param) {
                  return {
                          _0: keyword,
                          [Symbol.for("name")]: "Filtered"
                        };
                }));
  };
  var officialCategory = officialResources.length !== 0 ? React.createElement("div", {
          className: "space-y-4"
        }, Belt_Array.map(officialResources, (function (res) {
                return React.createElement(Packages$Card, {
                            value: res,
                            onKeywordSelect: onKeywordSelect,
                            key: res._0.name
                          });
              }))) : null;
  var communityCategory = communityResources.length !== 0 ? React.createElement("div", {
          className: "space-y-4"
        }, Belt_Array.map(communityResources, (function (res) {
                return React.createElement(Packages$Card, {
                            value: res,
                            onKeywordSelect: onKeywordSelect,
                            key: res._0.name
                          });
              }))) : null;
  var searchOverview;
  if (state) {
    var match$4 = selectedCategory ? [
        communityResources.length,
        "\"" + (
          selectedCategory ? "Community Resources" : "Official Resources"
        ) + "\""
      ] : [
        officialResources.length,
        "\"" + (
          selectedCategory ? "Community Resources" : "Official Resources"
        ) + "\""
      ];
    var numOfPackages = match$4[0];
    var packagePluralSingular = numOfPackages > 1 || numOfPackages === 0 ? "packages" : "package";
    searchOverview = React.createElement("div", {
          className: "font-medium"
        }, React.createElement("div", {
              className: "text-42 text-gray-95"
            }, state._0), React.createElement("div", {
              className: "text-gray-60-tr"
            }, React.createElement("span", {
                  className: "text-gray-95"
                }, numOfPackages), " " + packagePluralSingular + " found in ", React.createElement("span", {
                  className: "text-gray-95"
                }, match$4[1])));
  } else {
    searchOverview = null;
  }
  var searchResult = selectedCategory ? communityCategory : officialCategory;
  var router = Next.Router.useRouter(undefined);
  var firstRenderDone = React.useRef(false);
  React.useEffect((function () {
          firstRenderDone.current = true;
          
        }), []);
  React.useEffect((function () {
          Belt_Option.forEach(Js_dict.get(router.query, "search"), onValueChange);
          
        }), [firstRenderDone.current]);
  var updateQuery = function (value) {
    return Next.Router.replaceObj(router, {
                pathname: router.pathname,
                query: value === "" ? ({}) : Js_dict.fromArray([[
                          "search",
                          value
                        ]])
              });
  };
  React.useEffect((function () {
          if (state) {
            updateQuery(state._0);
          } else {
            updateQuery("");
          }
          
        }), [state]);
  var overlayState = React.useState(function () {
        return false;
      });
  return React.createElement(React.Fragment, undefined, React.createElement(Meta.make, {
                  description: "Official and unofficial resources, libraries and bindings for ReScript",
                  title: "Package Index | ReScript Documentation"
                }), React.createElement("div", {
                  className: "mt-16"
                }, React.createElement("div", {
                      className: "text-gray-80 text-lg"
                    }, React.createElement(Navigation.make, {
                          overlayState: overlayState
                        }), React.createElement("div", {
                          className: "flex overflow-hidden"
                        }, React.createElement("div", {
                              className: "flex justify-between min-w-320 lg:align-center w-full"
                            }, React.createElement(Mdx.Provider.make, {
                                  components: Markdown.$$default,
                                  children: React.createElement("main", {
                                        className: "w-full"
                                      }, React.createElement("div", {
                                            className: "relative w-full bg-gray-100 py-16"
                                          }, React.createElement("div", {
                                                className: "px-4 relative z-10 max-w-1280 flex justify-center"
                                              }, React.createElement("div", {
                                                    className: "w-full",
                                                    style: {
                                                      maxWidth: "47.5625rem"
                                                    }
                                                  }, React.createElement("h1", {
                                                        className: "text-white mb-10 md:mb-2 text-42 leading-1 font-medium antialiased"
                                                      }, "Libraries and Bindings"), React.createElement(Packages$SearchBox, {
                                                        value: searchValue,
                                                        onClear: onClear,
                                                        placeholder: "Enter a search term, keyword, etc",
                                                        onValueChange: onValueChange
                                                      }))), React.createElement("img", {
                                                className: "h-48 absolute bottom-0 right-0",
                                                src: "/static/illu_index_rescript@2x.png"
                                              })), React.createElement("div", {
                                            className: "bg-gray-5 px-4 lg:px-8 pb-48"
                                          }, React.createElement("div", {
                                                className: "pt-6"
                                              }, searchOverview), React.createElement("div", {
                                                className: "mt-12 space-y-8"
                                              }, searchResult), React.createElement("div", {
                                                className: "hidden lg:block h-full "
                                              }, React.createElement(Packages$InfoSidebar, {
                                                    setFilter: match$2[1],
                                                    filter: filter
                                                  }))))
                                }))), React.createElement(Footer.make, {}))));
}

function getStaticProps(_ctx) {
  var __x = fetch("https://registry.npmjs.org/-/v1/search?text=keywords:rescript&size=250");
  var __x$1 = __x.then(function (response) {
        return response.json();
      });
  return __x$1.then(function (data) {
              var pkges = Belt_Array.map(data.objects, (function (item) {
                      var pkg = item.package;
                      return {
                              name: pkg.name,
                              version: pkg.version,
                              keywords: filterKeywords(pkg.keywords),
                              description: Belt_Option.getWithDefault(pkg.description, ""),
                              repositoryHref: Js_null.fromOption(pkg.links.repository),
                              npmHref: pkg.links.npm
                            };
                    }));
              var index_data_dir = Path.join(Process.cwd(), "./data");
              var urlResources = JSON.parse(Fs.readFileSync(Path.join(index_data_dir, "packages_url_resources.json"), "utf8"));
              var props = {
                packages: pkges,
                urlResources: urlResources
              };
              return Promise.resolve({
                          props: props,
                          revalidate: 43200
                        });
            });
}

export {
  $$default ,
  $$default as default,
  getStaticProps ,
  
}
/* fs Not a pure module */
