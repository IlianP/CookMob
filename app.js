// Application State
let currentStep = 1;
let userPreferences = {
    dietaryRestrictions: [],
    skillLevel: '',
    cuisines: [],
    timeConstraint: '',
    householdSize: '',
    cookingGoals: []
};

let shoppingList = {};
let currentRecipe = null;
let currentScale = 1;

// Recipe Data
const recipes = [
    {
        "id": 1,
        "title": "15-Minute Garlic Pasta",
        "image": "🍝",
        "cookTime": "15 min",
        "difficulty": "Easy",
        "servings": 2,
        "category": "Quick & Easy",
        "cuisine": "Italian",
        "tags": ["vegetarian", "quick", "budget-friendly"],
        "description": "Simple and delicious garlic pasta that comes together in just 15 minutes with pantry staples.",
        "ingredients": [
            {"item": "Spaghetti", "amount": "200g", "section": "pantry"},
            {"item": "Garlic cloves", "amount": "4", "section": "produce"},
            {"item": "Olive oil", "amount": "3 tbsp", "section": "pantry"},
            {"item": "Red pepper flakes", "amount": "1/2 tsp", "section": "pantry"},
            {"item": "Parmesan cheese", "amount": "50g", "section": "dairy"},
            {"item": "Fresh parsley", "amount": "2 tbsp", "section": "produce"},
            {"item": "Salt", "amount": "to taste", "section": "pantry"},
            {"item": "Black pepper", "amount": "to taste", "section": "pantry"}
        ],
        "instructions": [
            "Cook spaghetti according to package directions until al dente",
            "While pasta cooks, heat olive oil in a large pan over medium heat",
            "Add minced garlic and red pepper flakes, cook for 1 minute until fragrant",
            "Add drained pasta to the pan with a splash of pasta water",
            "Toss with grated Parmesan, parsley, salt, and pepper",
            "Serve immediately with extra cheese on top"
        ],
        "nutrition": {"calories": 420, "protein": "15g", "carbs": "58g", "fat": "16g"},
        "cost": "$3.50"
    },
    {
        "id": 2,
        "title": "Healthy Buddha Bowl",
        "image": "🥗",
        "cookTime": "25 min",
        "difficulty": "Easy",
        "servings": 2,
        "category": "Healthy",
        "cuisine": "Asian-inspired",
        "tags": ["vegan", "gluten-free", "healthy", "colorful"],
        "description": "A nutritious and colorful bowl packed with vegetables, quinoa, and a creamy tahini dressing.",
        "ingredients": [
            {"item": "Quinoa", "amount": "1 cup", "section": "pantry"},
            {"item": "Sweet potato", "amount": "1 large", "section": "produce"},
            {"item": "Broccoli", "amount": "1 head", "section": "produce"},
            {"item": "Chickpeas", "amount": "1 can", "section": "pantry"},
            {"item": "Avocado", "amount": "1", "section": "produce"},
            {"item": "Tahini", "amount": "2 tbsp", "section": "pantry"},
            {"item": "Lemon juice", "amount": "2 tbsp", "section": "produce"},
            {"item": "Maple syrup", "amount": "1 tbsp", "section": "pantry"},
            {"item": "Olive oil", "amount": "2 tbsp", "section": "pantry"}
        ],
        "instructions": [
            "Cook quinoa according to package directions",
            "Roast cubed sweet potato at 400°F for 20 minutes",
            "Steam broccoli until tender-crisp",
            "Drain and rinse chickpeas",
            "Whisk together tahini, lemon juice, maple syrup, and olive oil for dressing",
            "Assemble bowls with quinoa, vegetables, and sliced avocado",
            "Drizzle with tahini dressing and serve"
        ],
        "nutrition": {"calories": 520, "protein": "18g", "carbs": "68g", "fat": "22g"},
        "cost": "$6.80"
    },
    {
        "id": 3,
        "title": "Classic Chicken Stir-Fry",
        "image": "🍛",
        "cookTime": "20 min",
        "difficulty": "Easy",
        "servings": 4,
        "category": "Quick & Easy",
        "cuisine": "Asian",
        "tags": ["gluten-free-option", "high-protein", "family-friendly"],
        "description": "A quick and flavorful chicken stir-fry with crisp vegetables in a savory sauce.",
        "ingredients": [
            {"item": "Chicken breast", "amount": "500g", "section": "meat"},
            {"item": "Bell peppers", "amount": "2", "section": "produce"},
            {"item": "Broccoli", "amount": "1 head", "section": "produce"},
            {"item": "Carrots", "amount": "2", "section": "produce"},
            {"item": "Soy sauce", "amount": "3 tbsp", "section": "pantry"},
            {"item": "Oyster sauce", "amount": "2 tbsp", "section": "pantry"},
            {"item": "Garlic", "amount": "3 cloves", "section": "produce"},
            {"item": "Ginger", "amount": "1 tbsp", "section": "produce"},
            {"item": "Vegetable oil", "amount": "2 tbsp", "section": "pantry"},
            {"item": "Cornstarch", "amount": "1 tbsp", "section": "pantry"}
        ],
        "instructions": [
            "Cut chicken into bite-sized pieces and toss with cornstarch",
            "Heat oil in a wok or large skillet over high heat",
            "Cook chicken until golden and cooked through, remove from pan",
            "Add vegetables and stir-fry for 3-4 minutes until crisp-tender",
            "Add garlic and ginger, cook for 30 seconds",
            "Return chicken to pan, add sauces and toss to combine",
            "Serve immediately over rice"
        ],
        "nutrition": {"calories": 285, "protein": "32g", "carbs": "12g", "fat": "12g"},
        "cost": "$8.50"
    },
    {
        "id": 4,
        "title": "Creamy Mushroom Risotto",
        "image": "🍄",
        "cookTime": "45 min",
        "difficulty": "Intermediate",
        "servings": 4,
        "category": "Weekend Projects",
        "cuisine": "Italian",
        "tags": ["vegetarian", "comfort-food", "creamy"],
        "description": "Rich and creamy risotto with earthy mushrooms and Parmesan cheese.",
        "ingredients": [
            {"item": "Arborio rice", "amount": "300g", "section": "pantry"},
            {"item": "Mixed mushrooms", "amount": "400g", "section": "produce"},
            {"item": "Vegetable stock", "amount": "1L", "section": "pantry"},
            {"item": "White wine", "amount": "125ml", "section": "pantry"},
            {"item": "Onion", "amount": "1", "section": "produce"},
            {"item": "Garlic", "amount": "2 cloves", "section": "produce"},
            {"item": "Parmesan cheese", "amount": "100g", "section": "dairy"},
            {"item": "Butter", "amount": "50g", "section": "dairy"},
            {"item": "Olive oil", "amount": "2 tbsp", "section": "pantry"},
            {"item": "Fresh thyme", "amount": "1 tbsp", "section": "produce"}
        ],
        "instructions": [
            "Heat stock in a saucepan and keep warm",
            "Sauté sliced mushrooms until golden, set aside",
            "In the same pan, cook diced onion until soft",
            "Add rice and stir for 2 minutes until translucent",
            "Add wine and stir until absorbed",
            "Add warm stock one ladle at a time, stirring constantly",
            "Continue for 18-20 minutes until rice is creamy",
            "Stir in mushrooms, butter, and Parmesan",
            "Season and serve with fresh thyme"
        ],
        "nutrition": {"calories": 420, "protein": "12g", "carbs": "65g", "fat": "14g"},
        "cost": "$9.20"
    },
    {
        "id": 5,
        "title": "Spicy Black Bean Tacos",
        "image": "🌮",
        "cookTime": "20 min",
        "difficulty": "Easy",
        "servings": 3,
        "category": "Quick & Easy",
        "cuisine": "Mexican",
        "tags": ["vegan", "spicy", "budget-friendly", "fiber-rich"],
        "description": "Flavorful and filling black bean tacos with fresh toppings and spicy seasonings.",
        "ingredients": [
            {"item": "Black beans", "amount": "2 cans", "section": "pantry"},
            {"item": "Corn tortillas", "amount": "6", "section": "pantry"},
            {"item": "Avocado", "amount": "1", "section": "produce"},
            {"item": "Red onion", "amount": "1/2", "section": "produce"},
            {"item": "Lime", "amount": "2", "section": "produce"},
            {"item": "Cilantro", "amount": "1/4 cup", "section": "produce"},
            {"item": "Cumin", "amount": "1 tsp", "section": "pantry"},
            {"item": "Chili powder", "amount": "1 tsp", "section": "pantry"},
            {"item": "Hot sauce", "amount": "to taste", "section": "pantry"},
            {"item": "Salt", "amount": "to taste", "section": "pantry"}
        ],
        "instructions": [
            "Drain and rinse black beans",
            "Heat beans with cumin, chili powder, and salt",
            "Warm tortillas in a dry pan or microwave",
            "Mash half the beans for texture",
            "Dice red onion and slice avocado",
            "Fill tortillas with bean mixture",
            "Top with avocado, onion, and cilantro",
            "Squeeze lime juice over tacos and add hot sauce",
            "Serve immediately"
        ],
        "nutrition": {"calories": 380, "protein": "16g", "carbs": "58g", "fat": "12g"},
        "cost": "$4.20"
    },
    {
        "id": 6,
        "title": "Honey Garlic Salmon",
        "image": "🐟",
        "cookTime": "25 min",
        "difficulty": "Easy",
        "servings": 4,
        "category": "Healthy",
        "cuisine": "Asian-inspired",
        "tags": ["gluten-free", "high-protein", "omega-3", "quick"],
        "description": "Tender salmon fillets glazed with a sweet and savory honey garlic sauce.",
        "ingredients": [
            {"item": "Salmon fillets", "amount": "4 pieces", "section": "meat"},
            {"item": "Honey", "amount": "3 tbsp", "section": "pantry"},
            {"item": "Soy sauce", "amount": "2 tbsp", "section": "pantry"},
            {"item": "Garlic", "amount": "4 cloves", "section": "produce"},
            {"item": "Rice vinegar", "amount": "1 tbsp", "section": "pantry"},
            {"item": "Sesame oil", "amount": "1 tsp", "section": "pantry"},
            {"item": "Green onions", "amount": "2", "section": "produce"},
            {"item": "Sesame seeds", "amount": "1 tbsp", "section": "pantry"},
            {"item": "Olive oil", "amount": "1 tbsp", "section": "pantry"}
        ],
        "instructions": [
            "Preheat oven to 400°F",
            "Mix honey, soy sauce, minced garlic, rice vinegar, and sesame oil",
            "Place salmon on baking sheet lined with parchment",
            "Brush salmon with half the honey garlic mixture",
            "Bake for 12-15 minutes until fish flakes easily",
            "Heat remaining sauce in a small pan until thickened",
            "Drizzle cooked salmon with reduced sauce",
            "Garnish with sliced green onions and sesame seeds",
            "Serve with steamed vegetables or rice"
        ],
        "nutrition": {"calories": 320, "protein": "34g", "carbs": "12g", "fat": "16g"},
        "cost": "$12.80"
    }
];

const groceryCategories = {
    "produce": "Fruits & Vegetables",
    "dairy": "Dairy & Eggs", 
    "meat": "Meat & Seafood",
    "pantry": "Pantry & Dry Goods",
    "frozen": "Frozen Foods",
    "bakery": "Bakery",
    "other": "Other Items"
};

// Utility Functions
function formatAmount(amount, scale = 1) {
    if (amount === 'to taste') return amount;
    
    // Extract number and unit
    const match = amount.match(/^(\d+(?:\.\d+)?(?:\/\d+)?)\s*(.*)$/);
    if (!match) return amount;
    
    let [, number, unit] = match;
    
    // Handle fractions
    if (number.includes('/')) {
        const [whole, frac] = number.split('/');
        number = parseFloat(whole) / parseFloat(frac);
    } else {
        number = parseFloat(number);
    }
    
    const scaledNumber = number * scale;
    
    // Format the scaled number nicely
    let formattedNumber;
    if (scaledNumber % 1 === 0) {
        formattedNumber = scaledNumber.toString();
    } else if (scaledNumber < 1) {
        // Convert to fraction for small numbers
        const fraction = toFraction(scaledNumber);
        formattedNumber = fraction;
    } else {
        formattedNumber = scaledNumber.toFixed(1).replace(/\.0$/, '');
    }
    
    return `${formattedNumber} ${unit}`.trim();
}

function toFraction(decimal) {
    const tolerance = 1.0E-6;
    let h1 = 1; let h2 = 0;
    let k1 = 0; let k2 = 1;
    let b = decimal;
    
    do {
        const a = Math.floor(b);
        let aux = h1; h1 = a * h1 + h2; h2 = aux;
        aux = k1; k1 = a * k1 + k2; k2 = aux;
        b = 1 / (b - a);
    } while (Math.abs(decimal - h1 / k1) > decimal * tolerance);
    
    return h1 > k1 ? `${Math.floor(h1/k1)} ${h1%k1}/${k1}` : `${h1}/${k1}`;
}

// Onboarding Functions
function startOnboarding() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const onboardingScreen = document.getElementById('onboarding-screen');
    
    welcomeScreen.classList.remove('active');
    onboardingScreen.classList.remove('hidden');
    onboardingScreen.classList.add('active');
    
    currentStep = 1;
    updateProgress();
    updateNavigationButtons();
}

function updateProgress() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const percentage = (currentStep / 6) * 100;
    
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `Step ${currentStep} of 6`;
}

function nextStep() {
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    const selectedOptions = currentStepElement.querySelectorAll('.option-btn.selected');
    
    if (selectedOptions.length === 0) {
        alert('Please select at least one option to continue.');
        return;
    }
    
    // Save selections
    saveStepData(currentStep, selectedOptions);
    
    if (currentStep < 6) {
        currentStepElement.classList.remove('active');
        currentStep++;
        document.getElementById(`step-${currentStep}`).classList.add('active');
        updateProgress();
        updateNavigationButtons();
    } else {
        completeOnboarding();
    }
}

function previousStep() {
    if (currentStep > 1) {
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        currentStep--;
        document.getElementById(`step-${currentStep}`).classList.add('active');
        updateProgress();
        updateNavigationButtons();
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.style.display = currentStep > 1 ? 'block' : 'none';
    }
    if (nextBtn) {
        nextBtn.textContent = currentStep === 6 ? 'Complete Setup' : 'Next';
    }
}

function saveStepData(step, selectedOptions) {
    const values = Array.from(selectedOptions).map(option => option.dataset.value);
    
    switch (step) {
        case 1:
            userPreferences.dietaryRestrictions = values;
            break;
        case 2:
            userPreferences.skillLevel = values[0];
            break;
        case 3:
            userPreferences.cuisines = values;
            break;
        case 4:
            userPreferences.timeConstraint = values[0];
            break;
        case 5:
            userPreferences.householdSize = values[0];
            break;
        case 6:
            userPreferences.cookingGoals = values;
            break;
    }
}

function completeOnboarding() {
    const onboardingScreen = document.getElementById('onboarding-screen');
    const mainApp = document.getElementById('main-app');
    
    onboardingScreen.classList.remove('active');
    onboardingScreen.classList.add('hidden');
    mainApp.classList.remove('hidden');
    mainApp.classList.add('active');
    
    displayFilteredRecipes();
    displayCurrentPreferences();
}

// Recipe Functions
function displayFilteredRecipes() {
    const filteredRecipes = filterRecipesByPreferences();
    const recipeGrid = document.getElementById('recipe-grid');
    
    if (filteredRecipes.length === 0) {
        recipeGrid.innerHTML = '<p class="empty-state">No recipes match your preferences. Try adjusting your filters!</p>';
        return;
    }
    
    recipeGrid.innerHTML = filteredRecipes.map(recipe => `
        <div class="recipe-card" data-recipe-id="${recipe.id}">
            <div class="recipe-image">${recipe.image}</div>
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.title}</h3>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-meta">
                    <span class="recipe-time">⏱️ ${recipe.cookTime}</span>
                    <span class="recipe-difficulty">📊 ${recipe.difficulty}</span>
                    <span class="recipe-servings">👥 ${recipe.servings} servings</span>
                </div>
                <div class="recipe-tags">
                    ${recipe.tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click listeners to recipe cards
    document.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', () => {
            const recipeId = parseInt(card.dataset.recipeId);
            openRecipeModal(recipeId);
        });
        card.style.cursor = 'pointer';
    });
}

function filterRecipesByPreferences() {
    return recipes.filter(recipe => {
        // Filter by dietary restrictions
        if (userPreferences.dietaryRestrictions.length > 0 && !userPreferences.dietaryRestrictions.includes('none')) {
            const hasMatch = userPreferences.dietaryRestrictions.some(restriction => 
                recipe.tags.includes(restriction) || recipe.tags.includes(restriction.replace('-', '-'))
            );
            if (!hasMatch) return false;
        }
        
        // Filter by skill level
        if (userPreferences.skillLevel) {
            const allowedDifficulties = ['Easy'];
            if (userPreferences.skillLevel === 'intermediate') allowedDifficulties.push('Intermediate');
            if (userPreferences.skillLevel === 'advanced') allowedDifficulties.push('Advanced');
            
            if (!allowedDifficulties.includes(recipe.difficulty)) return false;
        }
        
        // Filter by cuisines
        if (userPreferences.cuisines.length > 0) {
            const hasMatch = userPreferences.cuisines.some(cuisine => 
                recipe.cuisine.toLowerCase().includes(cuisine.toLowerCase())
            );
            if (!hasMatch) return false;
        }
        
        // Filter by time constraint
        if (userPreferences.timeConstraint) {
            const timeValue = parseInt(recipe.cookTime);
            const maxTime = parseInt(userPreferences.timeConstraint);
            if (timeValue > maxTime) return false;
        }
        
        return true;
    });
}

function openRecipeModal(recipeId) {
    currentRecipe = recipes.find(r => r.id === recipeId);
    if (!currentRecipe) return;
    
    currentScale = 1;
    
    document.getElementById('modal-recipe-title').textContent = currentRecipe.title;
    document.getElementById('modal-cook-time').innerHTML = `⏱️ ${currentRecipe.cookTime}`;
    document.getElementById('modal-difficulty').innerHTML = `📊 ${currentRecipe.difficulty}`;
    document.getElementById('modal-servings').innerHTML = `👥 ${currentRecipe.servings} servings`;
    
    updateRecipeModal();
    document.getElementById('recipe-modal').classList.remove('hidden');
}

function updateRecipeModal() {
    if (!currentRecipe) return;
    
    document.getElementById('current-servings').textContent = Math.round(currentRecipe.servings * currentScale);
    
    // Update ingredients
    const ingredientsList = document.getElementById('modal-ingredients');
    ingredientsList.innerHTML = currentRecipe.ingredients.map(ingredient => 
        `<li>${formatAmount(ingredient.amount, currentScale)} ${ingredient.item}</li>`
    ).join('');
    
    // Update instructions
    const instructionsList = document.getElementById('modal-instructions');
    instructionsList.innerHTML = currentRecipe.instructions.map(instruction => 
        `<li>${instruction}</li>`
    ).join('');
    
    // Update nutrition
    const nutritionGrid = document.getElementById('modal-nutrition');
    nutritionGrid.innerHTML = Object.entries(currentRecipe.nutrition).map(([key, value]) => `
        <div class="nutrition-item">
            <div class="nutrition-value">${key === 'calories' ? Math.round(parseInt(value) * currentScale) : value}</div>
            <div class="nutrition-label">${key}</div>
        </div>
    `).join('');
}

function scaleRecipe(multiplier) {
    currentScale *= multiplier;
    if (currentScale < 0.5) currentScale = 0.5;
    if (currentScale > 4) currentScale = 4;
    updateRecipeModal();
}

function closeRecipeModal() {
    document.getElementById('recipe-modal').classList.add('hidden');
    currentRecipe = null;
    currentScale = 1;
}

// Shopping List Functions
function addAllToShoppingList() {
    if (!currentRecipe) return;
    
    currentRecipe.ingredients.forEach(ingredient => {
        const key = ingredient.item;
        if (shoppingList[key]) {
            // Item already exists, update amount if needed
            shoppingList[key].amount = formatAmount(ingredient.amount, currentScale);
        } else {
            shoppingList[key] = {
                item: ingredient.item,
                amount: formatAmount(ingredient.amount, currentScale),
                section: ingredient.section
            };
        }
    });
    
    updateShoppingListDisplay();
    alert(`Added all ingredients from ${currentRecipe.title} to shopping list!`);
}

function addCustomItem() {
    const input = document.getElementById('custom-item-input');
    const itemText = input.value.trim();
    
    if (!itemText) return;
    
    shoppingList[itemText] = {
        item: itemText,
        amount: '1',
        section: 'other'
    };
    
    input.value = '';
    updateShoppingListDisplay();
}

function removeFromShoppingList(itemKey) {
    delete shoppingList[itemKey];
    updateShoppingListDisplay();
}

function updateShoppingListDisplay() {
    const container = document.getElementById('shopping-list-content');
    
    if (Object.keys(shoppingList).length === 0) {
        container.innerHTML = '<p class="empty-state">Your shopping list is empty. Add items from recipes!</p>';
        return;
    }
    
    // Group items by section
    const groupedItems = {};
    Object.values(shoppingList).forEach(item => {
        if (!groupedItems[item.section]) {
            groupedItems[item.section] = [];
        }
        groupedItems[item.section].push(item);
    });
    
    container.innerHTML = Object.entries(groupedItems).map(([section, items]) => `
        <div class="shopping-section">
            <div class="section-header">${groceryCategories[section] || section}</div>
            <div class="shopping-items">
                ${items.map(item => `
                    <div class="shopping-item">
                        <span class="item-text">${item.item}</span>
                        <span class="item-amount">${item.amount}</span>
                        <button class="remove-item" data-item="${item.item}" title="Remove item">×</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const itemKey = btn.dataset.item;
            removeFromShoppingList(itemKey);
        });
    });
}

function clearShoppingList() {
    if (confirm('Are you sure you want to clear your entire shopping list?')) {
        shoppingList = {};
        updateShoppingListDisplay();
    }
}

function exportShoppingList() {
    if (Object.keys(shoppingList).length === 0) {
        alert('Your shopping list is empty!');
        return;
    }
    
    let exportText = 'SHOPPING LIST\n' + '='.repeat(20) + '\n\n';
    
    // Group by section
    const groupedItems = {};
    Object.values(shoppingList).forEach(item => {
        if (!groupedItems[item.section]) {
            groupedItems[item.section] = [];
        }
        groupedItems[item.section].push(item);
    });
    
    Object.entries(groupedItems).forEach(([section, items]) => {
        exportText += `${groceryCategories[section] || section.toUpperCase()}\n`;
        exportText += '-'.repeat(groceryCategories[section]?.length || section.length) + '\n';
        items.forEach(item => {
            exportText += `☐ ${item.amount} ${item.item}\n`;
        });
        exportText += '\n';
    });
    
    showExportModal(exportText);
}

// Export Functions
function exportRecipe() {
    if (!currentRecipe) return;
    
    let exportText = `${currentRecipe.title.toUpperCase()}\n`;
    exportText += '='.repeat(currentRecipe.title.length) + '\n\n';
    
    exportText += `Cook Time: ${currentRecipe.cookTime}\n`;
    exportText += `Difficulty: ${currentRecipe.difficulty}\n`;
    exportText += `Servings: ${Math.round(currentRecipe.servings * currentScale)}\n`;
    exportText += `Cost: ${currentRecipe.cost}\n\n`;
    
    exportText += 'INGREDIENTS\n';
    exportText += '-'.repeat(11) + '\n';
    currentRecipe.ingredients.forEach(ingredient => {
        exportText += `• ${formatAmount(ingredient.amount, currentScale)} ${ingredient.item}\n`;
    });
    
    exportText += '\nINSTRUCTIONS\n';
    exportText += '-'.repeat(12) + '\n';
    currentRecipe.instructions.forEach((instruction, index) => {
        exportText += `${index + 1}. ${instruction}\n`;
    });
    
    exportText += '\nNUTRITION (per serving)\n';
    exportText += '-'.repeat(21) + '\n';
    Object.entries(currentRecipe.nutrition).forEach(([key, value]) => {
        exportText += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;
    });
    
    showExportModal(exportText);
}

function showExportModal(text) {
    document.getElementById('export-text').value = text;
    document.getElementById('export-modal').classList.remove('hidden');
}

function closeExportModal() {
    document.getElementById('export-modal').classList.add('hidden');
}

function copyToClipboard() {
    const textarea = document.getElementById('export-text');
    textarea.select();
    document.execCommand('copy');
    alert('Copied to clipboard!');
}

// Navigation Functions
function switchView(viewName) {
    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-view="${viewName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Switch views
    document.querySelectorAll('.app-view').forEach(view => view.classList.remove('active'));
    const targetView = document.getElementById(`${viewName}-view`);
    if (targetView) {
        targetView.classList.add('active');
    }
    
    if (viewName === 'shopping-list') {
        updateShoppingListDisplay();
    }
}

// Search and Filter Functions
function setupSearchAndFilters() {
    const searchInput = document.getElementById('recipe-search');
    const categoryFilter = document.getElementById('category-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterRecipes);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterRecipes);
    }
}

function filterRecipes() {
    const searchInput = document.getElementById('recipe-search');
    const categoryFilter = document.getElementById('category-filter');
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : '';
    
    let filteredRecipes = filterRecipesByPreferences();
    
    if (searchTerm) {
        filteredRecipes = filteredRecipes.filter(recipe => 
            recipe.title.toLowerCase().includes(searchTerm) ||
            recipe.description.toLowerCase().includes(searchTerm) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
    
    if (selectedCategory) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.category === selectedCategory);
    }
    
    const recipeGrid = document.getElementById('recipe-grid');
    if (!recipeGrid) return;
    
    if (filteredRecipes.length === 0) {
        recipeGrid.innerHTML = '<p class="empty-state">No recipes found matching your criteria.</p>';
        return;
    }
    
    recipeGrid.innerHTML = filteredRecipes.map(recipe => `
        <div class="recipe-card" data-recipe-id="${recipe.id}">
            <div class="recipe-image">${recipe.image}</div>
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.title}</h3>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-meta">
                    <span class="recipe-time">⏱️ ${recipe.cookTime}</span>
                    <span class="recipe-difficulty">📊 ${recipe.difficulty}</span>
                    <span class="recipe-servings">👥 ${recipe.servings} servings</span>
                </div>
                <div class="recipe-tags">
                    ${recipe.tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-add click listeners to recipe cards
    document.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', () => {
            const recipeId = parseInt(card.dataset.recipeId);
            openRecipeModal(recipeId);
        });
        card.style.cursor = 'pointer';
    });
}

// Preferences Functions
function displayCurrentPreferences() {
    const container = document.getElementById('current-preferences');
    if (!container) return;
    
    const preferenceGroups = [
        { title: 'Dietary Restrictions', values: userPreferences.dietaryRestrictions },
        { title: 'Skill Level', values: [userPreferences.skillLevel] },
        { title: 'Favorite Cuisines', values: userPreferences.cuisines },
        { title: 'Time Constraint', values: [userPreferences.timeConstraint] },
        { title: 'Household Size', values: [userPreferences.householdSize] },
        { title: 'Cooking Goals', values: userPreferences.cookingGoals }
    ];
    
    container.innerHTML = preferenceGroups.map(group => {
        if (!group.values || group.values.length === 0 || (group.values.length === 1 && !group.values[0])) return '';
        
        return `
            <div class="preference-group">
                <h4>${group.title}</h4>
                <div class="preference-values">
                    ${group.values.filter(v => v).map(value => `<span class="preference-tag">${value}</span>`).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function resetOnboarding() {
    // Reset preferences
    userPreferences = {
        dietaryRestrictions: [],
        skillLevel: '',
        cuisines: [],
        timeConstraint: '',
        householdSize: '',
        cookingGoals: []
    };
    
    // Clear selections
    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
    
    // Show onboarding
    const mainApp = document.getElementById('main-app');
    const onboardingScreen = document.getElementById('onboarding-screen');
    
    mainApp.classList.remove('active');
    mainApp.classList.add('hidden');
    onboardingScreen.classList.remove('hidden');
    onboardingScreen.classList.add('active');
    
    currentStep = 1;
    document.querySelectorAll('.onboarding-step').forEach((step, index) => {
        step.classList.toggle('active', index === 0);
    });
    
    updateProgress();
    updateNavigationButtons();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Get Started button
    const getStartedBtn = document.getElementById('get-started-btn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', startOnboarding);
    }
    
    // Onboarding navigation
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextStep);
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', previousStep);
    }
    
    // Setup navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            switchView(btn.dataset.view);
        });
    });
    
    // Setup option selection in onboarding
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const step = this.closest('.onboarding-step');
            const stepId = step.id;
            
            // Handle multiple selection for steps 1, 3, and 6
            if (['step-1', 'step-3', 'step-6'].includes(stepId)) {
                this.classList.toggle('selected');
            } else {
                // Single selection for other steps
                step.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
            }
        });
    });
    
    // Recipe modal controls
    const closeRecipeModalBtn = document.getElementById('close-recipe-modal');
    if (closeRecipeModalBtn) {
        closeRecipeModalBtn.addEventListener('click', closeRecipeModal);
    }
    
    const scaleHalfBtn = document.getElementById('scale-half');
    const scaleDoubleBtn = document.getElementById('scale-double');
    if (scaleHalfBtn) {
        scaleHalfBtn.addEventListener('click', () => scaleRecipe(0.5));
    }
    if (scaleDoubleBtn) {
        scaleDoubleBtn.addEventListener('click', () => scaleRecipe(2));
    }
    
    const addAllToListBtn = document.getElementById('add-all-to-list');
    if (addAllToListBtn) {
        addAllToListBtn.addEventListener('click', addAllToShoppingList);
    }
    
    const exportRecipeBtn = document.getElementById('export-recipe-btn');
    if (exportRecipeBtn) {
        exportRecipeBtn.addEventListener('click', exportRecipe);
    }
    
    // Shopping list controls
    const addCustomItemBtn = document.getElementById('add-custom-item');
    if (addCustomItemBtn) {
        addCustomItemBtn.addEventListener('click', addCustomItem);
    }
    
    const exportShoppingListBtn = document.getElementById('export-shopping-list');
    if (exportShoppingListBtn) {
        exportShoppingListBtn.addEventListener('click', exportShoppingList);
    }
    
    const clearShoppingListBtn = document.getElementById('clear-shopping-list');
    if (clearShoppingListBtn) {
        clearShoppingListBtn.addEventListener('click', clearShoppingList);
    }
    
    // Export modal controls
    const closeExportModalBtn = document.getElementById('close-export-modal');
    const closeExportBtn = document.getElementById('close-export-btn');
    const copyToClipboardBtn = document.getElementById('copy-to-clipboard');
    
    if (closeExportModalBtn) {
        closeExportModalBtn.addEventListener('click', closeExportModal);
    }
    if (closeExportBtn) {
        closeExportBtn.addEventListener('click', closeExportModal);
    }
    if (copyToClipboardBtn) {
        copyToClipboardBtn.addEventListener('click', copyToClipboard);
    }
    
    // Settings controls
    const resetOnboardingBtn = document.getElementById('reset-onboarding-btn');
    if (resetOnboardingBtn) {
        resetOnboardingBtn.addEventListener('click', resetOnboarding);
    }
    
    // Setup search and filters
    setupSearchAndFilters();
    
    // Setup modal close on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
            }
        });
    });
    
    // Setup custom item input enter key
    const customItemInput = document.getElementById('custom-item-input');
    if (customItemInput) {
        customItemInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addCustomItem();
            }
        });
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }
});