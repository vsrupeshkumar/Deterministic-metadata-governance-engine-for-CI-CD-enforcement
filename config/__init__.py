"""
Module: __init__.py

Purpose:
Maintains base configuration and environment settings for __init__.py.

Responsibilities:
- Handles specific `__init__.py` domain logic
- Integrates seamlessly with sibling modules
- Adheres strictly to Hephaestus governance constraints

Part of: Hephaestus Governance Engine

Hephaestus configuration package.

Exposes the singleton settings instance for use across the entire application.
Import as: from config import settings
"""

from config.settings import settings

__all__ = ["settings"]

