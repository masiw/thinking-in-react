import React from 'react'
import _ from 'lodash'

export const FilterableProductTable = React.createClass({
    getInitialState: function() {
        return {
            filterText: '',
            inStockOnly: false
        }
    },
    render: function() {
        let groupedProds = _.groupBy(
                _.filter(this.props.products, product =>
                    !this.state.inStockOnly || product.inStock
                    && _.includes(product.name, this.state.filterText)
                )
            , 'category')
          , data = _.map(_.keys(groupedProds), key => {return {name: key, products: groupedProds[key]}})
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    />
                <ProductTable products={data}/>
            </div>
        )
    }
})

export const SearchBar = React.createClass ({
    render: function() {
        let isChecked = this.props.inStockOnly ? true : null
        return (
            <div>
                <input type='search' name='product-search' placeholder='Search...' value={this.props.filterText}></input>
                <label>
                    <input type='checkbox' value={isChecked}></input>
                    Only show products in stock
                </label>
            </div>
        )
    }
})

export const ProductTable = React.createClass ({
    render: function() {
        console.log(JSON.stringify(this.props.products))
        let content = this.props.products.map(category => {
            let products = category.products.map(product =>
                <ProductRow product={product} key={product.name}/>
            )
            return [<ProductCategoryRow productCategory={category} key={category.name}/>]
                .concat(products)
        }).reduce((content, items) => content.concat(items), [])

        return (
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Price</td>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
        )
    }
})

export const ProductCategoryRow = React.createClass ({
    render() {
        return (
            <tr>
                <td colSpan='2'>{this.props.productCategory.name}</td>
            </tr>
        )
    }
})

export const ProductRow = React.createClass ({
    render() {
        return (
            <tr>
                <td>this.props.product.name</td>
                <td>this.props.product.price</td>
            </tr>
        )
    }
})