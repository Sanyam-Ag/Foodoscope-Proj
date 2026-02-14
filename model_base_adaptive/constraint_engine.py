def generate_constraints(medical_conditions):

    constraint_map = {
        "Diabetes Type 2": {
            "max_sugar": 25
        },
        "Hypertension": {
            "max_sodium": 1500
        }
    }

    constraints = {}

    for cond in medical_conditions:
        if cond in constraint_map:
            constraints.update(constraint_map[cond])

    return constraints
