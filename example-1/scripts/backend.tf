terraform {
    backend "azurerm" {
        resource_group_name  = "<your-resource-group>"
        storage_account_name = "<your-storage-acount>"
        container_name       = "terraform"
        key                  = "terraform.tfstate"
    }
}