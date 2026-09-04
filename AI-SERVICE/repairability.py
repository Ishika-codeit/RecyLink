def assess_repairability(category, condition):
    """
    Decide what should happen to an e-waste item
    based on its category and reported condition.
    """

    category = category.lower().strip()
    condition = condition.lower().strip()

    severe_conditions = [
        "burnt",
        "burned",
        "completely crushed",
        "severely damaged",
        "destroyed",
        "broken beyond repair",
    ]

    if any(word in condition for word in severe_conditions):

        return {
            "recommendation": "RECYCLE",
            "repairability_confidence": 0.95,
            "reason": "Severe physical damage makes repair or reuse unlikely.",
            "suggested_actions": [
                "Do not attempt repair",
                "Send to an authorized e-waste recycler"
            ],
            "reuse_potential": "LOW"
        }

    uncertain_conditions = [
        "unknown",
        "not sure",
        "doesn't turn on",
        "does not turn on",
        "water damaged",
        "internal issue",
    ]

    if any(word in condition for word in uncertain_conditions):

        return {
            "recommendation": "NEEDS_INSPECTION",
            "repairability_confidence": 0.70,
            "reason": "The reported condition is insufficient to determine repairability.",
            "suggested_actions": [
                "Perform diagnostic inspection",
                "Test major components",
                "Assess repair cost"
            ],
            "reuse_potential": "MEDIUM"
        }

    if category == "battery":

        return {
            "recommendation": "NEEDS_INSPECTION",
            "repairability_confidence": 0.90,
            "reason": "Battery condition requires safety inspection before reuse or repair.",
            "suggested_actions": [
                "Inspect for swelling or physical damage",
                "Check terminals",
                "Perform safe battery assessment",
                "Send for appropriate recycling if damaged"
            ],
            "reuse_potential": "LOW"
        }

    minor_conditions = [
        "scratched",
        "cracked screen",
        "screen cracked",
        "weak battery",
        "battery weak",
        "buttons not working",
        "button not working",
        "dirty",
        "minor damage",
        "cosmetic damage",
        "charging port damaged",
    ]

    if any(word in condition for word in minor_conditions):

        actions = {
            "mobile": [
                "Inspect display",
                "Test battery",
                "Check charging port"
            ],

            "keyboard": [
                "Clean keyboard",
                "Test keys",
                "Inspect connection"
            ],

            "mouse": [
                "Clean sensor",
                "Test buttons",
                "Inspect cable or wireless connection"
            ],

            "television": [
                "Inspect display",
                "Test power supply",
                "Check internal boards"
            ],

            "printer": [
                "Clean printer mechanism",
                "Check paper feed",
                "Test connectivity"
            ],

            "microwave": [
                "Inspect controls",
                "Check power system",
                "Perform safety inspection"
            ],

            "washing machine": [
                "Inspect motor",
                "Check control system",
                "Test electrical components"
            ],

            "player": [
                "Test power",
                "Check buttons and controls",
                "Inspect storage or media components"
            ],

            "pcb": [
                "Inspect board for damaged components",
                "Check solder joints",
                "Test electrical functionality"
            ],
        }

        return {
            "recommendation": "REFURBISH",
            "repairability_confidence": 0.85,
            "reason": "The reported damage appears potentially repairable.",
            "suggested_actions": actions.get(
                category,
                [
                    "Inspect damaged components",
                    "Test functionality",
                    "Assess repair cost"
                ]
            ),
            "reuse_potential": "HIGH"
        }

    return {
        "recommendation": "NEEDS_INSPECTION",
        "repairability_confidence": 0.65,
        "reason": "More information about the item's condition is required.",
        "suggested_actions": [
            "Perform diagnostic inspection",
            "Test major components",
            "Assess repairability and repair cost"
        ],
        "reuse_potential": "MEDIUM"
    }


