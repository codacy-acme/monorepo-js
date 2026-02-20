function foo1(a, b, a) {
    typeof a === undefined
    console.log("value of the second a:", a);
}

var bar = function (a, b, a) {
    console.log("value of the second a:", a);
};

var damn = function (a, b) {
    console.log("value of the second a:", a);
    console.log('value of the second a:', a);
    return a*b;
};

function complexMethod(x, y, z) {
    var result = 0;
    
    if (x > 0) {
        if (y > 0) {
            for (var i = 0; i < x; i++) {
                if (i % 2 === 0) {
                    result += i;
                } else {
                    result -= i;
                }
            }
        } else if (y < 0) {
            for (var j = 0; j < Math.abs(y); j++) {
                if (j % 3 === 0) {
                    result += j * 2;
                } else if (j % 3 === 1) {
                    result += j;
                } else {
                    result -= j;
                }
            }
        } else {
            result = x * 10;
        }
    } else if (x < 0) {
        if (z > 10) {
            result = z * x;
        } else {
            result = z - x;
        }
    } else {
        result = y + z;
    }
    
    return result;
}

function processData(data, type, options) {
    var output = [];
    var temp = 0;
    
    if (type === 'basic') {
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                if (data[i] > 0) {
                    if (data[i] % 2 === 0) {
                        output.push(data[i] * 2);
                    } else {
                        output.push(data[i] * 3);
                    }
                } else if (data[i] < 0) {
                    if (data[i] % 2 === 0) {
                        output.push(data[i] / 2);
                    } else {
                        output.push(data[i] / 3);
                    }
                } else {
                    output.push(0);
                }
            }
        }
    } else if (type === 'advanced') {
        if (options && options.multiply) {
            for (var j = 0; j < data.length; j++) {
                if (data[j] > 10) {
                    temp = data[j] * options.multiply;
                    if (temp > 100) {
                        output.push(temp / 2);
                    } else {
                        output.push(temp);
                    }
                } else if (data[j] > 5) {
                    output.push(data[j] * 2);
                } else {
                    output.push(data[j]);
                }
            }
        } else {
            for (var k = 0; k < data.length; k++) {
                output.push(data[k]);
            }
        }
    } else if (type === 'complex') {
        for (var m = 0; m < data.length; m++) {
            if (data[m] > 0) {
                if (data[m] < 10) {
                    output.push(data[m] + 1);
                } else if (data[m] < 50) {
                    output.push(data[m] + 5);
                } else if (data[m] < 100) {
                    output.push(data[m] + 10);
                } else {
                    output.push(data[m] + 50);
                }
            } else {
                output.push(0);
            }
        }
    }
    
    return output;
}

function validateInput(input, rules, strict) {
    var errors = [];
    var warnings = [];
    
    if (!input) {
        errors.push('Input is required');
        return { valid: false, errors: errors, warnings: warnings };
    }
    
    if (rules.minLength) {
        if (input.length < rules.minLength) {
            if (strict) {
                errors.push('Input too short');
            } else {
                warnings.push('Input shorter than recommended');
            }
        }
    }
    
    if (rules.maxLength) {
        if (input.length > rules.maxLength) {
            errors.push('Input too long');
        }
    }
    
    if (rules.pattern) {
        if (!rules.pattern.test(input)) {
            if (strict) {
                errors.push('Pattern mismatch');
            } else {
                warnings.push('Pattern mismatch');
            }
        }
    }
    
    if (rules.type) {
        if (rules.type === 'numeric') {
            if (isNaN(input)) {
                errors.push('Must be numeric');
            } else {
                if (rules.min !== undefined && input < rules.min) {
                    errors.push('Value too low');
                }
                if (rules.max !== undefined && input > rules.max) {
                    errors.push('Value too high');
                }
            }
        } else if (rules.type === 'alpha') {
            if (!/^[a-zA-Z]+$/.test(input)) {
                errors.push('Must be alphabetic');
            }
        } else if (rules.type === 'alphanumeric') {
            if (!/^[a-zA-Z0-9]+$/.test(input)) {
                errors.push('Must be alphanumeric');
            }
        }
    }
    
    return {
        valid: errors.length === 0,
        errors: errors,
        warnings: warnings
    };
}

function calculateScore(user, activities, bonuses) {
    var score = 0;
    var multiplier = 1;
    
    if (user.level > 10) {
        multiplier = 2;
        if (user.level > 20) {
            multiplier = 3;
            if (user.level > 30) {
                multiplier = 4;
            }
        }
    }
    
    for (var i = 0; i < activities.length; i++) {
        if (activities[i].type === 'quest') {
            if (activities[i].completed) {
                if (activities[i].difficulty === 'easy') {
                    score += 10 * multiplier;
                } else if (activities[i].difficulty === 'medium') {
                    score += 25 * multiplier;
                } else if (activities[i].difficulty === 'hard') {
                    score += 50 * multiplier;
                } else {
                    score += 100 * multiplier;
                }
            }
        } else if (activities[i].type === 'challenge') {
            if (activities[i].completed) {
                score += activities[i].points * multiplier;
                if (activities[i].bonus) {
                    score += activities[i].bonus;
                }
            }
        } else if (activities[i].type === 'event') {
            if (activities[i].participated) {
                score += 5 * multiplier;
            }
        }
    }
    
    if (bonuses) {
        if (bonuses.streakDays > 0) {
            if (bonuses.streakDays > 7) {
                score += 50;
                if (bonuses.streakDays > 30) {
                    score += 200;
                }
            } else {
                score += bonuses.streakDays * 5;
            }
        }
        
        if (bonuses.referrals > 0) {
            score += bonuses.referrals * 20;
        }
    }
    
    return score;
}

function transformArray(arr, operation, config) {
    var result = [];
    var cache = {};
    
    if (!arr || arr.length === 0) {
        return result;
    }
    
    if (operation === 'filter') {
        for (var i = 0; i < arr.length; i++) {
            if (config.condition === 'positive') {
                if (arr[i] > 0) {
                    result.push(arr[i]);
                }
            } else if (config.condition === 'negative') {
                if (arr[i] < 0) {
                    result.push(arr[i]);
                }
            } else if (config.condition === 'even') {
                if (arr[i] % 2 === 0) {
                    result.push(arr[i]);
                }
            } else if (config.condition === 'odd') {
                if (arr[i] % 2 !== 0) {
                    result.push(arr[i]);
                }
            }
        }
    } else if (operation === 'map') {
        for (var j = 0; j < arr.length; j++) {
            if (config.transform === 'double') {
                result.push(arr[j] * 2);
            } else if (config.transform === 'triple') {
                result.push(arr[j] * 3);
            } else if (config.transform === 'square') {
                result.push(arr[j] * arr[j]);
            } else {
                result.push(arr[j]);
            }
        }
    } else if (operation === 'reduce') {
        var accumulator = config.initial || 0;
        for (var k = 0; k < arr.length; k++) {
            if (config.operation === 'sum') {
                accumulator += arr[k];
            } else if (config.operation === 'multiply') {
                accumulator *= arr[k];
            } else if (config.operation === 'max') {
                if (arr[k] > accumulator) {
                    accumulator = arr[k];
                }
            } else if (config.operation === 'min') {
                if (arr[k] < accumulator) {
                    accumulator = arr[k];
                }
            }
        }
        result.push(accumulator);
    }
    
    return result;
}