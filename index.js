/**
 * Our store. Has all of the initial variables for the code.
 */
const STORE = [
  { name: 'apples', completed: false },
  { name: 'oranges', completed: false },
  { name: 'milk', completed: false },
  { name: 'bread', completed: false }
];

/**
 * Renders the shopping list item from an object. Returns rendered HTML as a string.
 * 
 * @param {object} item 
 */
function generateItemElement(item) {
  let code = `<li>
  <span class="shopping-item `;
  // Adds in the item checked class if the item has been completed, otherwise does nothing.
  if (item.completed) {
    code += 'shopping-item__checked';
  }
  code += `">${item.name}</span>
  <div class="shopping-item-controls">
    <button class="shopping-item-toggle">
      <span class="button-label">check</span>
    </button>
    <button class="shopping-item-delete">
      <span class="button-label">delete</span>
    </button>
  </div>
</li>`;
  return code;
}

/**
 * Calls the render function for the entire list of items, then inserts it into the document.
 */
function renderShoppingList() {
  let html = '';
  for (let item of STORE) {
    html += generateItemElement(item);
  }
  $('.shopping-list').html(html);
}

/**
 * Responds to the add item form. 
 * Pushes a new item to the store and re-renders the list.
 * @see renderShoppingList
 * @param {Event} evt 
 */
function handleNewItemSubmit(evt) {
  evt.preventDefault();
  const listItem = $('#shopping-list-entry').val();
  $('#shopping-list-entry').val('');
  STORE.push({ name: listItem, completed: false });
  renderShoppingList();
}

/**
 * Responds to the check button.
 * Toggles the checked class on an item and re-renders the list.
 * @see renderShoppingList
 * @param {Event} evt 
 */
function handleItemCheckClicked(evt) {
  let name = $(this).closest('li').find('.shopping-item').html();
  for (let item of STORE) {
    if (item.name == name) {
      item.completed = !item.completed;
    }
  }
  renderShoppingList();
}

/**
 * Responds to the delete button.
 * Deletes an item from the shopping list then re-renders the list.
 * @see renderShoppingList
 * @param {Event} evt 
 */
function handleDeleteItemClicked(evt) {
  let name = $(this).closest('li').find('.shopping-item').html();
  const index = STORE.findIndex((item) => {
    return item.name == name;
  });
  STORE.splice(index, 1);
  renderShoppingList();
}

/**
 * Links all of the functions previously listed in this document into their correct event handlers.
 */
$(() => {
  // Register the add item event handler.
  $('#js-shopping-list-form').submit(handleNewItemSubmit);

  // Ensure out entry field is blank so we can see our lovely placeholder.
  $('#shopping-list-entry').val('');

  // Register the delete item event handler.
  $('.shopping-list').on('click', '.shopping-item-delete', handleDeleteItemClicked);

  // Register the checked item event handler.
  $('.shopping-list').on('click', '.shopping-item-toggle', handleItemCheckClicked);

  // Render our list so the user can see it when the page loads.
  renderShoppingList();
});