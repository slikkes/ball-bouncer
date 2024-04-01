const entities = {
    "bricks": {
        "basic": {
            "colors": [
                "#febe00"
            ],
            "hp": 1,
            "score": 10,
        },
        "medium": {
            "colors": [
                "#febe00",
                "#ff7800"
            ],
            "hp": 2,
            "score": 10,
        },
        "strong": {
            "colors": [
                "#febe00",
                "#ff7800",
                "#33e3da"
            ],
            "hp": 3,
            "score": 10,
        },
        "ultra": {
            "colors": [
                "#febe00",
                "#ff7800",
                "#33e3da",
                "#1c93f3"
            ],
            "hp": 5,
            "score": 100,
        },
        "veryUltra": {
            "colors": [
                "#febe00",
                "#ff7800",
                "#33e3da",
                "#1c93f3",
                "#6824ff"
            ],
            "hp": 10,
            "score": 500,
        }
    },
    powerUps: {
        size: {
            maxLevel: 3,
            dropRate: {medium: 0.15, strong: 0.4, ultra: 0.6, veryUltra: 0.8}
        },
        ballSpeed: {
            maxLevel: 3,
            dropRate: {medium: 0.15, strong: 0.4, ultra: 0.6, veryUltra: 0.8}
        },
        playerSpeed: {
            maxLevel: 3,
            dropRate: {medium: 0.15, strong: 0.4, ultra: 0.6, veryUltra: 0.8}
        },
        damage: {
            maxLevel: 3,
            dropRate: { strong: 0.4, ultra: 0.6, veryUltra: 0.8}
        },
        luck: {
            maxLevel: 2,
            dropRate: {  ultra: 0.6, veryUltra: 0.8}
        },
    }
}