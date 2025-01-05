import { Schema, Types} from "mongoose";
import { mongoose } from "../../config/db";
// 1. Create an interface representing a document in MongoDB.
interface Tenant {
    name: string;
    subdomain: string;
    // Use `Types.ObjectId` in document interface...
    organization: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
// 2. Create a Schema corresponding to the document interface.
const tenantSchema = new Schema<Tenant>({
    name: { type: String, required: true },
    subdomain: { type: String, required: true, unique: true },
    // And `Schema.Types.ObjectId` in the schema definition.
    organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
// 3. Create a Model.
// const TenantModel = mongoose.model<Tenant>('Tenant', tenantSchema);
// 4. Export the Model and the Document interface.
export default mongoose.models.TenantModel || mongoose.model("TenantModel", tenantSchema);