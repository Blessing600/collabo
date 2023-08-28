import Drone from "../../models/Drone";
import sequelize from "@/db/database";
const bcrypt = require("bcryptjs");
const multer = require("multer");

const handler = (req, res) => {
    if(req.method === "POST") {
        const ownerName = req.body.ownerName;
        const operatorName = req.body.operatorName;
        const physicalAddress = req.body.physicalAddress;
        const mailingAddress = req.body.mailingAddress;
        const email = req.body.email;
        const phone = req.body.phone;
        const drone = req.body.drone;
        const image = req.file;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        const regex = /^\S+@\S+\.\S+/
        const emailValid = regex.test(email);
        const droneId = drone[0].serialNumber;

        
        console.log(image);

        if(!ownerName ||
            !operatorName ||
            !physicalAddress || 
            !emailValid ||
            isNaN(phone) ||
            drone.length < 1 ||
            confirmPassword !== password
            ) {
                return res.status(422).json({
                    message: "invalid values. please fill all fields correctly"
                })
            }
        
        
        const fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "images")
            },
            filename: (req, file, cb) => {
                cb(null, `${file.originalname}-${new Date().toISOString()}`);
            }
        })

        const fileFilter = (req, file, cb) => {
            if(file.mimetype === "image/png" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg"
            ) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }

        multer({storage: fileStorage, fileFilter: fileFilter}).single('image');

        sequelize.sync()
        .then(() => Drone.findAll())
        .then(results => {
            const droneResults = results.map(result => result.toJSON());
            const accessedDrones = [];
            
            for(const drones of droneResults) {
                for(const drone of drones.drone) {
                    accessedDrones.push(drone);
                }
            }

            const filteredDrone = accessedDrones.filter(drone => drone.serialNumber === droneId);

            if(filteredDrone.length > 0) {
                return res.status(422).json({
                    error: "drone already registered! duplicate records not accepted"
                })
            }  
            return Drone.findAll({ where: {email: email} })
            // return Drone.findByPk(1);
            .then(results => {
                if(results.length > 0) {
                    const result = results[0];
                    const newDroneArr = [...result.drone]
                    newDroneArr.push(drone[0])
                    result.drone = newDroneArr;
    
                    return result.save();
                }
                return bcrypt.hash(password, 12)
                .then((hashedPassword) => {
                    return Drone.create({
                        ownerName: ownerName,
                        operatorName: operatorName,
                        physicalAddress: physicalAddress,
                        mailingAddress: mailingAddress,
                        email: email,
                        phoneNumber: phone,
                        drone: drone,
                        password: hashedPassword,
                    })
                })
            })
            .then(() => {
                return res.status(201).json({
                    message: "drone successfullyy stored",
                })
            })
            
        })
         .catch((err) => {
            console.log(err)
        })
    }
}

export default handler;
