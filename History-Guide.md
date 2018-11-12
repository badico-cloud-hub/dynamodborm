[versionNumber] / [Date]
===================

  * Type and summary
  * Type: And a list of summarys
    - Sub-type summary

Types and subtypes

  * Refac: Refactor
  * Perf: Performance
  * Fix: Fixer
  * Feat: Feature


  0.1.0 / 2018-11-12
===================

  * Fix issue where `"Request aborted"` may be logged in `res.sendfile`
  * Fix JSDoc for `Router` constructor
  * Refac: Use `array-flatten` module for flattening arrays
  * Refact: Simplify `res.cookie` to call `res.append`
  * perf: skip parsing of entire `X-Forwarded-Proto` header
  * Feat: Invoke callback for sendfile when client aborts
    - Applies to `res.sendFile`, `res.sendfile`, and `res.download`
    - `err` will be populated with request aborted error
  * Support IP address host in `req.subdomains`
  * deps: body-parser@1.18.3
    - Add 70 new types for file extensions
    - Use instance methods on steam to check for listeners
    - Fix deprecation warnings on Node.js 10+
    - Fix stack trace for strict json parse error
    - deps: depd@~1.1.2
    - deps: http-errors@~1.6.3
    - deps: iconv-lite@0.4.23
    - deps: qs@6.5.2
    - deps: raw-body@2.3.3
    - deps: type-is@~1.6.16
  * deps: proxy-addr@~2.0.4
    - deps: ipaddr.js@1.8.0
  * deps: qs@6.5.2
  * deps: safe-buffer@5.1.2