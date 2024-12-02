const ethUtil = require('ethereumjs-util');

module.exports = function(req, res, next) {
  const signature = req.header('x-auth-signature');
  const address = req.header('x-auth-address');
  const message = req.header('x-auth-message');

  console.log('Auth middleware received:', { signature, address, message });

  if (!signature || !address || !message) {
    console.log('Missing authentication headers');
    return res.status(401).json({ msg: 'No authentication provided' });
  }

  try {
    const msgBuffer = ethUtil.toBuffer(message);
    const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
    const signatureBuffer = ethUtil.toBuffer(signature);
    const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
    const publicKey = ethUtil.ecrecover(
      msgHash,
      signatureParams.v,
      signatureParams.r,
      signatureParams.s
    );
    const addressBuffer = ethUtil.publicToAddress(publicKey);
    const recoveredAddress = ethUtil.bufferToHex(addressBuffer);

    console.log('Recovered address:', recoveredAddress);
    console.log('Provided address:', address);

    if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
      req.user = { address };
      next();
    } else {
      console.log('Invalid signature: addresses do not match');
      res.status(401).json({ msg: 'Invalid signature' });
    }
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(401).json({ msg: 'Invalid signature' });
  }
};