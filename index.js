let store = [
  {name: 'apples', completed: false},
  {name: 'oranges', completed: false},
  {name: 'milk', completed: false},
  {name: 'bread', completed: false}
];

function generateListItem(item) {
  let code = `<li>
  <span class="shopping-item `;
  if(item.completed) {
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

function renderShoppingList() {
  let html = '';
  for(let item of store) {
    html += generateListItem(item);
  }
  $('.shopping-list').html(html);
}

function handleShoppingItemAdd(evt) {
  evt.preventDefault();
  const listItem = $('#shopping-list-entry').val();
  $('#shopping-list-entry').val('');
  store.push({name:listItem, completed: false});
  renderShoppingList();
}

function handleShoppingItemToggle(evt) {
  let name = $(this).closest('li').find('.shopping-item').html();
  for(let item of store) {
    if(item.name == name) {
      item.completed = !item.completed;
    }
  }
  renderShoppingList();
}

function handleShoppingItemRemove(evt) {
  let name = $(this).closest('li').find('.shopping-item').html();
  store = store.filter(function(itm) {
    return itm.name !== name;
  });
  renderShoppingList();
}

$(function(){
    $('#js-shopping-list-form').submit(handleShoppingItemAdd);

    $('#shopping-list-entry').val('');
  
    $('.shopping-list').on('click', '.shopping-item-delete', handleShoppingItemRemove);
  
    $('.shopping-list').on('click', '.shopping-item-toggle', handleShoppingItemToggle);
  
  });
  
$(() => {
  renderShoppingList();
});