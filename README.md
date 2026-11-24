# Post the Meme, Win the Feed

[![make.fun](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf.svg)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf)
[![Rank](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf/WuYuanJie-211/u-myronera-post-the-meme-win-the-feed-2de960bf/rank.svg)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf)
[![Reward](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf/WuYuanJie-211/u-myronera-post-the-meme-win-the-feed-2de960bf/reward.svg)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf)

## Entry

One meme about make.fun, aimed at people who build AI agents: a tired robot
building agents for free at 3am, then the same robot in sunglasses holding
cash when make.fun pays real money for bounties. The meme is posted from
[@WuYuanJie17](https://x.com/WuYuanJie17) on X, tagging `@_myronera`.

Post text:

> Me building AI agents for free vs me when make.fun pays real money for bounties 😂 @_myronera — go build, get paid: make.fun

## How it works

`POST.json` holds the public X post URL. `main.ts` validates it is a real
`https://x.com/WuYuanJie17/status/<digits>` URL (the PLACEHOLDER is refused
with exit 1), copies `POST.json` verbatim to `/output/POST.json`, and
re-reads the output to verify it matches byte-for-byte. The entry runs
twice with the same bytes: the output is a verbatim copy of the input file.
