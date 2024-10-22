import { PublicKey, clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '@solana/spl-token';

(async () => {
    // Step 1: Connect to cluster and generate a new Keypair
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const fromWallet = Keypair.generate();
    const toPublicKey = new PublicKey("3yaGQYpHALn7AsRGtRPUvJSVXVKSfX1eUaTZuCMfVZVG");

    // Step 2: Airdrop SOL into your from wallet
    const airDropSol = async ( connection, publicKey , amount) => {
        try {
          console.log(`Airdropping ${amount} SOL to the wallet!`);
          const txHash = await connection.requestAirdrop(
            new PublicKey(publicKey),
            amount * LAMPORTS_PER_SOL
          )
      
        // verify transaction has been mined
          let latestBlockHash = connection.getLatestBlockhash();
    
          await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: txHash
        });
      
      
        } catch (err) {
            console.log(err);
        }
      
    }

    await airDropSol(connection, fromWallet.publicKey, 2 * LAMPORTS_PER_SOL);
    

    
    // Step 3: Create new token mint and get the token account of the fromWallet address
    //If the token account does not exist, create it
    const mint = await createMint(connection, fromWallet, fromWallet.publicKey, null, 9);
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            fromWallet,
            mint,
            fromWallet.publicKey
    )
    
    //Step 4: Mint a new token to the from account
    let signature = await mintTo(
        connection,
        fromWallet,
        mint,
        fromTokenAccount.address,
        fromWallet.publicKey,
        1000000000,
        []
    );
    console.log('mint tx:', signature);
    

    //Step 5: Get the token account of the to-wallet address and if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        toPublicKey
    );

    

    //Step 6: Transfer the new token to the to-wallet's token account that was just created
    // Transfer the new token to the "toTokenAccount" we just created
    signature = await transfer(
        connection,
        fromWallet,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        1000000000,
        []
    );
    console.log('transfer tx:', signature);

 
})();
