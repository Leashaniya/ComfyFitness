import { Register } from "../controllers/AuthController";
import { login } from "../controllers/AuthController";

const router=express.Router();

router.post("/register",Register);
router.post("/login",login);

export default router;