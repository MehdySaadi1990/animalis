const bcrypt = require('bcrypt')
const {User, validate} = require('../models/users')
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/email');
const Token = require("../models/token");
const crypto = require("crypto");

exports.signup = async (req, res, next) => {
    try {
        const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({message : "Utilisateur déjà existant"});
      const hashPassword = await bcrypt.hash(req.body.password, 10)
      user = await new User({...req.body, password:hashPassword}).save()
      let token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save()

    const message = `https://www.animalis-lome.com/verify/${user._id}/${token.token}`;
    await sendEmail(user.email, "Inscription Animalis Lomé", `<h1>Confirmation Email</h1>
                                                <h2>Bonjour</h2>
                                                <p>Merci de vous être inscrit sur Animalis Lomé.<br/>
                                                 Veuillez confirmer votre e-mail en cliquant sur le lien suivant</p><br/>
                                                <a href=${message}> Cliquez ici</a><br/>
                                                <p>Si vous n'êtes pas à l'origine de cette demande d'incscription<br/>
                                                Prière d'envoyer un mail à l'adresse suivante : <a href='mailto:animalis.lome@gmail.com'> animalis.lome@gmail.com</a></p>
                                                </div>`);

    res.status(200).json({message:"An Email sent to your account please verify"});
    } catch (error) {
        res.status(400).json({message : "An error occured"});
    };
}

exports.confirm = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) return res.status(400).send("Invalid link");
  
      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!token) return res.status(400).send("Invalid link");
      await User.updateOne({ _id: user._id},{ verified: true });
      await Token.deleteOne({ _id: token._id})
      res.status(200).json({message : "email verified sucessfully"});
    } catch (error) {
      res.status(400).json({message : "An error occured"});
    }
  };
  
exports.login = (req, res, next) => {
    User.findOne({email:req.body.email})
    .then(user=>{
        if(!user){
            return res.status(401).json({message: 'Paire login/mot de passe incorrecte'})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid=>{
            if(!valid){
                return res.status(401).json({message: 'Paire login/mot de passe incorrecte'})
            }
            if(user.verified === false){
                return res.status(401).json({message : 'Utilisateur non confirmé'})
            }
            res.status(200).json({ 
                userId: user._id,
                token: jwt.sign(
                    {userId:user._id},
                    'RANDOM_TOKEN_SECRET',
                    {expiresIn:'24h'}
                )
            });
        })
        .catch(error=>res.status(500).json({error}))
    })
        .catch(error=>res.status(500).json({error}))

};

exports.sendEmailForPassword = async (req, res, next)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user) return res.status(401).json({message: 'Problème authentification'})

        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save()

        const message = `https://www.animalis-lome.com/resetPassword/${user._id}/${token.token}`;
         sendEmail(user.email, "Animalis Reset Password", `<h1>Réinitialisation Mot de passe</h1>
                                                <p>Vous avez demander une réinitialisation de votre mot de passe.<br/>
                                                 Veuillez confirmer votre e-mail en cliquant sur le lien suivant</p><br/>
                                                <a href=${message}> Cliquez ici</a>
                                                </div>`);
        res.status(200).json({message:"An Email sent to your account please verify"});
    } catch (error) {
        res.status(400).json({message : "An error occured"})
    }
    
}

exports.resetPassword = async (req, res, next)=>{
    try {
       const user = await User.findOne({_id:req.params.id})
       if(!user) return res.status(401).json({message:"Problème d'authentification"})
       const token = await Token.findOne({userId: user._id,
                                          token: req.params.token,})
       if(!token) return res.status(401).json({message:"Problème d'authentification"})
       const hashPassword = await bcrypt.hash(req.body.password, 10)
       await User.updateOne({_id:req.params.id},{password:hashPassword})
       await Token.deleteOne({ _id: token._id})
       res.status(200).json({message:'mot de passe modifié'})
    }catch (error) {
       res.status(500).json({error})
    }
       
}