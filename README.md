# Medl Fullstack Tech Test

#Node.js Express: Github Dataset API (2 Hours)
<br>

<p>In this challenge, you are part of a team building an inventory management system. One requirement is for a REST API service to provide inventory information using the Nodejs Express framework. Functionality to add, delete and get inventory items have been implemented. You will be required to implement the 'update an inventory item' functionality as well as to perform some logical queries.</p>
<p>&nbsp;</p>
<p>The definitions and a detailed requirements list follow. You will be graded on whether all the available test cases pass. You are to ensure all tests pass</p>
<p>&nbsp;</p>
<p>Each inventory object is a JSON entry with the following keys:</p>
<ul>
	<li>
<code>id</code>: This is the unique ID of the inventory item.</li>
	<li><code>productName</code>: This is the item name.</li>
	<li><code>price</code>: This is the item price.</li>
	<li><code>totalQuantity</code>: This is the total available quantity of the inventory item.</li>
	<li><code>tax</code>: This is the tax flag of the inventory item, which determines if tax is applicable or not.</li>
	<li><code>taxPercentage</code>: If tax is applicable, this property would be a valid number.</li>
	<li><code>lowStockCount</code>: This is the low stock notification limit of the inventory item.</li>
	<li><code>expiryDate</code>: This is the expiration date of the inventory item.</li>
	<li><code>isOutOfStock</code>: This is a flag that indicates weather the inventory item is out of stock or not.</li>
	<li><code>createdAt</code>: This represents the date the inventory item is created. It is auto-populated.</li>
	<li>
<code>substituteItems</code>: This represents a list of replaceable alternatives for the inventory item. This is typically an array of inventory items.
	<li>
</ul>
<p>&nbsp;</p>
<details><summary class="section-title">Sample JSON git inventory object</summary>
<div class="collapsible-details">
<pre>{
&nbsp; "id":4055191679,
&nbsp; "productName":"Panadol",
&nbsp; "price":100,
&nbsp; "totalQuantity":20,
&nbsp; "tax": true,
&nbsp; "taxPercentage":3,
&nbsp; "lowStockCount":"10",
&nbsp; "expiryDate":"2015-10-03 06:13:31",
&nbsp; "substituteItems":[],
&nbsp; "createdAt":"2015-10-03 06:13:31"
&nbsp; "isOutOfStock": false,
}</pre>
</div>
</details>

### Instructions

<h5>You should complete the given project so that it passes all the test cases when running the provided unit tests.</h5>
<h5>Do not modify the test file.</h5>

<p>&nbsp;</p>
<p>You are required to ensure that the <em>REST</em> service implements the following functionality:</p>
<ol><li>
<em>Update an existing inventory item</em>: The service should be able to update properties of an existing inventory item. <em>PUT</em> request at <code>/inventory</code>. The inventory <em>JSON</em> is sent in the request body. If the inventory item with the id does not exist then the response code should be <em>404</em>, or if there are other fields being updated for the inventory then the <em>HTTP</em> response code should be <em>400</em>, otherwise, the response code should be <em>200</em>.</li>
	<li>
<em>Erase all the inventory records</em>: The service should be able to erase all the inventory items by the <em>DELETE</em> request at <code>/inventory</code>. The <em>HTTP</em> response code should be <em>200</em>.</li>
	<li>
<em>Fetch special inventory</em>: The service endpoint which is triggered with a  <em>GET</em> request at <code>/special</code> should be able to get a list of inventories matching the below criteria.
<ul>
<li>Return a array of string containing the productName of inventories: string[]</li>
<li>Each return inventory productName should have it's price contained in this specific array ==> [32,50,12,89,10,44,54,19,80,36,23,20]</li>
</ul>
</li>
</ol>
<p>&nbsp;</p>

### Clone Repo

```
git clone 'repo-link'
```

### Install

```
npm install
```

### Run Application

```
npm start
```

### Run Test

```
npm run test
```
