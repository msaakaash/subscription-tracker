import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
  try{
    const decision = await aj.protect(req,{ request: 1 });
    if(decision.isDenied()){
      if(decision.reason.isRateLimit()) res.status(429).json({message: 'Rate Limit Exceeded'});
      if(decision.reason.isBot()) res.status(403).json({message: 'Bot Blocked'});
      return res.status(403).json({error:'Access Denied'});
    }  
    next();
  }catch(error){
    console.log('Arcjet Middleware Error:', error);
    next(error);
  }
}

export default arcjetMiddleware;