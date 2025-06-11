export const validateSteps = async (step: number) => {
    switch (step) {
        case 0:
            return validatonDetails();
        case 1:
            return validationPlan();
        case 2:
            return validationAddOns();
        case 3:
            return validationSummary();
        default:
            return false;
    }
};
function validatonDetails() {
    throw new Error("Function not implemented.");
}

function validationPlan() {
    throw new Error("Function not implemented.");
}

function validationAddOns() {
    throw new Error("Function not implemented.");
}
function validationSummary() {
    throw new Error("Function not implemented.");
}
