import mongoose, { Schema, model, models } from 'mongoose';

const submissionOptions = { discriminatorKey: 'certificateType', timestamps: true };
//discriminatorKey = the field that determines the type of certificate 

const SubmissionSchema = new Schema({
  applicantName: { type: String, required: true },
  emails: [{ type: String, required: true }],
  phones: [{ type: String, required: true }],
  socialLinks: {
    facebook: String,
    instagram: String,
    linkedin: String,
    twitter: String
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected'], 
    default: 'Pending' 
  },
  certificateType: { 
    type: String, 
    required: true, 
    enum: ['Host', 'Visitor', 'Donor', 'Intern', 'Volunteer'] 
  }
}, submissionOptions);

const Submission = models.Submission || model('Submission', SubmissionSchema);

// Discriminators 

// INTERN
if (!models.Submission.discriminators?.Intern) {
  Submission.discriminator('Intern', new Schema({
    gender: String,
    startDate: Date,
    endDate: Date,
    mode: { type: String, enum: ['Virtual', 'Offline'] },
    postRole: String,
    scheduleType: { type: String, enum: ['Daily', 'Weekly', 'Flexible'] },
    isUniversityRequirement: { type: Boolean, default: false }, 
    universityName: String,
    donationType: String,
    rating: Number,
    photosLink: String,
    remarks: String
  }));
}

// VOLUNTEER
if (!models.Submission.discriminators?.Volunteer) {
  Submission.discriminator('Volunteer', new Schema({
    gender: String,
    startDate: Date,
    endDate: Date,
    mode: { type: String, enum: ['Virtual', 'Offline'] },
    postRole: String,
    scheduleType: { type: String, enum: ['Daily', 'Weekly', 'Flexible'] },
    isUniversityRequirement: { type: Boolean, default: false },
    universityName: String,
    donationType: String,
    rating: Number,
    photosLink: String,
    remarks: String
  }));
}

// HOST
if (!models.Submission.discriminators?.Host) {
  Submission.discriminator('Host', new Schema({
    eventDate: Date,
    facilityLocation: String, 
    companyCoordinator: String,
    centerVisited: String,
    noOfChildren: Number,
    caretakers: [{ type: String }],
    itemsDonated: [{
        item: { type: String, required: true },
        quantity: { type: Number, required: true }
    }],
    reportUploadLink: String,
    futurePartnershipRemarks: String,
    helpedFinancially: { type: Boolean, default: false },
    financialAmount: Number, 
    nextExpectedVisit: Date
  }));
}

// VISITOR
if (!models.Submission.discriminators?.Visitor) {
  Submission.discriminator('Visitor', new Schema({
    visitDate: Date,
    centerVisited: String,
    attendantName: String,
    purposeOfVisit: { type: String, enum: ['General', 'Inspection', 'Donation'] },
    itemsDonated: [{
        item: { type: String, required: true },
        quantity: { type: Number, required: true }
    }],
    uploadPhotosLink: String,
    helpedFinancially: { type: Boolean, default: false },
    financialAmount: Number,
    nextFollowUpDue: Date,
    additionalRemarks: String
  }));
}

// DONOR
if (!models.Submission.discriminators?.Donor) {
  Submission.discriminator('Donor', new Schema({
    attendantName: String,
    logisticsMethod: { type: String, enum: ['Pickup', 'Drop off at Center'] },
    centerVisited: String,
    itemsDonated: [{
        item: { type: String, required: true },
        quantity: { type: Number, required: true }
    }],
    helpedFinancially: { type: Boolean, default: false },
    financialAmount: Number,
    nextFollowUpDue: Date,
    uploadPhotosLink: String,
    remarks: String
  }));
}

export default Submission;