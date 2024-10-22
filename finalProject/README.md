# NFT Mint from Candy machine with UI

Over here I store the code used to create the fungible tokens, create the candy machine, and altered code from the metaplex UI 

## Fungible tokens

the ***github repository*** responsible for creating the fungible tokens is over here:

https://github.com/Metacrafters/Module2-create-spl-token-js

to make the fungible tokens you have to copy and replace the code in index.js with the code in `codeForSPLtoken.js`

you might have to tweak the string in `toPublicKey` declaration to match your own preferred public key


then run `node index.js` 


 it will return to you the mint and transfer tx hashes,
 
which you can then monitor on the block explorer for more details about the mint and transfer


## Candy Machine

the github repository responsible for the nft candy machine is over here:

https://github.com/Metacrafters/Module3-Candymachine

to make the candy machine your way. you have to code and replace the code in   `config.json` with the `config.json` in this repository,

then run the following commands

*make a new keyPair with solana-cli*
`solana-keygen new --outfile ./wallet.json`

save the public Key of this wallet


*associate the new keyPair with your Solana and Sugar CLI*
` solana config set --keypair ./wallet.json`

*set solana-cli to devnet mode*
`solana config set --url https://api.devnet.solana.com`

*airdrop some tokens to your newly generated wallet*
`solana airdrop 1`

now you can use the public key of the newly generated wallet to replace the `creators address field`

and replace the `splToken` field with your SPL token's mint address (token address)

and replace the `splTokenAddress` field with the SPL token associated address of the person that recieved the mint 

get the above two values by checking your mint and transfer tx hashes on the explorer


## Candy Machine UI
