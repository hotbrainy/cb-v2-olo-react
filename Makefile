SHELL := /bin/bash
.ONESHELL:
.SILENT:

AWS_DEFAULT_REGION?=ap-southeast-2

# COMMENT or DELETE the ROLES that are not applicable.
AWS_ROLE?=arn:aws:iam::752824223740:role/dig-opo-prd-cicd-admin

# Add the value of the TIMESTAMP required below (example 1578281858341)
TARGET_TIMESTAMP?=1668061737

listDeployments: _assumeRole
	$(info List Serverless Deployments ..)
	serverless deploy list --verbose;
.PHONY: listDeployments

rollBack: _assumeRole
	$(info Rollback to the following Timestamp : ${TARGET_TIMESTAMP} ..)
	serverless rollback --timestamp ${TARGET_TIMESTAMP};
.PHONY: rollBack

_assumeRole:
ifndef AWS_SESSION_TOKEN
	@echo "No existing AWS_SESSION_TOKEN. Assuming into role: $(AWS_ROLE)"
	$(call assumeRole)
endif
.PHONY: _assumeRole

# functions
define assumeRole
	$(eval KST = $(shell aws sts assume-role --role-arn $(AWS_ROLE) --role-session-name cd | jq '.Credentials["AccessKeyId","SecretAccessKey","SessionToken"]'))
	$(eval export AWS_ACCESS_KEY_ID = $(shell echo $(KST) | cut -d' ' -f1))
	$(eval export AWS_SECRET_ACCESS_KEY = $(shell echo $(KST) | cut -d' ' -f2))
	$(eval export AWS_SESSION_TOKEN = $(shell echo $(KST) | cut -d' ' -f3))
endef
